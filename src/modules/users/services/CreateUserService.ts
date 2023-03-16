import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import { hash } from "bcryptjs";
import authConfig from '@config/auth';
import { inject, injectable } from "tsyringe";
import { ICreateUser } from "../domain/models/ICreateUser";

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository
  ) {}

  public async execute({ name, email, password}: ICreateUser): Promise<User> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists)
      throw new AppError('Email already exists', 400);

    const hashedPassword = await hash(password, Number(authConfig.jwt.salt));
    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    return await this.usersRepository.save(user);
  }
}
