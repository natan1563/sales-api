import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";
import { isAfter, addHours } from "date-fns";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import UserTokensRepository from "../infra/typeorm/repositories/UserTokensRepository";
import authConfig from '@config/auth';
import { inject, injectable } from "tsyringe";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: UserTokensRepository
  ) {}

  public async execute({token, password}: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists, or is invalid.');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user)
      throw new AppError('User not found.');

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate))
      throw new AppError('Token expired.');

    user.password = await hash(password, Number(authConfig.jwt.salt));

    await this.usersRepository.save(user);
  }
}
