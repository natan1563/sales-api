import AppError from "@shared/errors/AppError";
import Etherealmail from "@config/mail/EtherealMail";
import SESMail from "@config/mail/SESMail";
import mailConfig from "@config/mail/mail";
import path from 'path';
import { inject, injectable } from "tsyringe";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import UserTokensRepository from "../infra/typeorm/repositories/UserTokensRepository";

interface IRequest {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: UserTokensRepository
  ) {}

  public async execute({email}: IRequest): Promise<void> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (!userExists) {
      throw new AppError('Could not found the user, please check your e-mail address and try again.');
    }

    const { token } = await this.userTokensRepository.generate(userExists.id);
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
