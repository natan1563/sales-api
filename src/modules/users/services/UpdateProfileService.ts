
import { getCustomRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import authConfig from '@config/auth';
import { IUpdateUser } from "../domain/models/IUpdateUser";
import { inject, injectable } from "tsyringe";

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository
  ) {}

  public async execute({
      user_id,
      name,
      email,
      password,
      old_password,
    }: IUpdateUser): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user)
      throw new AppError("User not found", 404);

    const userEmailExists = await this.usersRepository.findByEmail(email);

    if (userEmailExists && userEmailExists.id !== user.id)
      throw new AppError("There is already one user with this email.", 400);

    if (password && !old_password)
      throw new AppError("Old password is required", 400);

    if (password && old_password) {
      const checkOldPasword = await compare(old_password, user.password);

      if (!checkOldPasword)
        throw new AppError("Old password does'nt valid", 400);

      user.password = await hash(password, Number(authConfig.jwt.salt));
    }

    user.name = name;
    user.email = email;

    await this.usersRepository.save(user);
    return user;
  }
}
