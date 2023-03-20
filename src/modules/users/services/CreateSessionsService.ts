import AppError from "@shared/errors/AppError";
import authConfig from '@config/auth'
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { IUser } from "../domain/models/IUser";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: IUser;
  token: string;
}

@injectable()
export default class CreateSessionsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    const messageError = 'Incorrect email/password combination';
    if (!user)
      throw new AppError(messageError, 401);

    const passwordIsAvailable = await this.hashProvider.compareHash(password, user.password);

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
