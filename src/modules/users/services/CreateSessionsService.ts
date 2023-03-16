import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import authConfig from '@config/auth'
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export default class CreateSessionsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    const messageError = 'Incorrect email/password combination';
    if (!user)
      throw new AppError(messageError, 401);

    const passwordIsAvailable = await compare(password, user.password);

    if (!passwordIsAvailable)
      throw new AppError(messageError, 401);

    const options = {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn
    };
    const token = sign(
      {},
      authConfig.jwt.secret,
      options
    );

    return {
      user,
      token,
    };
  }
}
