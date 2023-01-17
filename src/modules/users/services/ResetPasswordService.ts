import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";
import { isAfter, addHours } from "date-fns";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async execute({token, password}: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists, or is invalid.');
    }

    const user = await userRepository.findById(userToken.user_id);

    if (!user)
      throw new AppError('User not found.');

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate))
      throw new AppError('Token expired.');

    user.password = await hash(password, 8);
  }
}
