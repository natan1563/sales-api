import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import { compare } from "bcryptjs";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
}

export default class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UsersRepository);
    const user = await userRepository.findByEmail(email);

    const messageError = 'Incorrect email/password combination';
    if (!user)
      throw new AppError(messageError, 401);

    const passwordIsAvailable = await compare(password, user.password);

    if (!passwordIsAvailable)
      throw new AppError(messageError, 401);

    return {user};
  }
}
