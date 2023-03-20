import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";

import { inject, injectable } from "tsyringe";
import { ICreateUser } from "../domain/models/ICreateUser";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ name, email, password}: ICreateUser): Promise<User> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists)
      throw new AppError('Email already exists', 400);

    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    return await this.usersRepository.save(user);
  }
}
