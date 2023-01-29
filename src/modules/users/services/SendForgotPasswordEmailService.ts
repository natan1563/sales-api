import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import Etherealmail from "@config/mail/EtherealMail";
import SESMail from "@config/mail/SESMail";
import mailConfig from "@config/mail/mail";
import path from 'path';

interface IRequest {
  email: string;
}

export default class SendForgotPasswordEmailService {
  public async execute({email}: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const userExists = await userRepository.findByEmail(email);

    if (!userExists) {
      throw new AppError('Could not found the user, please check your e-mail address and try again.');
    }

    const { token } = await userTokenRepository.generate(userExists.id);
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    );

    const driverMail = (mailConfig.driver === 'ses') ? SESMail : Etherealmail;
    await driverMail.sendMail({
      to: {
        name: userExists.name,
        email: userExists.email,
      },
      subject: '[API Vendas] Recuperação de senha.',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: userExists.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
        }
      },
    })
  }
}
