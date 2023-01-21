import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import Etherealmail from "@config/mail/EtherealMail";
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

    await Etherealmail.sendMail({
      to: {
        name: userExists.name,
        email: userExists.email,
      },
      subject: '[API Vendas] Recuperação de senha.',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: userExists.name,
          link: `http://localhost:3000/reset_password?token=${token}`
        }
      },
    })
  }
}
