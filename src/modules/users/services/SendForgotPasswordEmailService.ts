import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import Etherealmail from "@config/mail/EtherealMail";

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

    const userToken = await userTokenRepository.generate(userExists.id);

    await Etherealmail.sendMail({
      to: email,
      body: `Solicitação de redefinição de senha recebida ${userToken?.token}`,
    })
  }
}
