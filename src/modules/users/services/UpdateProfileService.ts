
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import authConfig from '@config/auth';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

export default class UpdateProfileService {
  public async execute({
      user_id,
      name,
      email,
      password,
      old_password,
    }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(user_id);

    if (!user)
      throw new AppError("User not found", 404);

    const userEmailExists = await usersRepository.findByEmail(email);

    if (userEmailExists && userEmailExists.id !== user.id)
      throw new AppError("There is already one user with this email.", 400);

    if (password && !old_password)
      throw new AppError("Old password is required", 400);

    if (password && old_password) {
      const checkOldPasword = await compare(old_password, user.password);

      if (!checkOldPasword)
        throw new AppError("Old password does'nt valid", 400);

      user.password = await hash(password, authConfig.jwt.salt);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);
    return user;
  }
}
