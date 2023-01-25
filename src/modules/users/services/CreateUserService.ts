import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import { hash } from "bcryptjs";
import authConfig from '@config/auth';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password}: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);
    const emailExists = await userRepository.findByEmail(email);

    if (emailExists)
      throw new AppError('Email already exists', 400);

    const hashedPassword = await hash(password, authConfig.jwt.salt);
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword
    })

    await userRepository.save(user);

    return user;
  }
}
