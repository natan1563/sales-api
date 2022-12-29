import { getCustomRepository } from "typeorm";
import path from "path";
import fs from 'fs';
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import uploadConfig from '@config/upload'
import User from "../typeorm/entities/User";

interface IRequest {
  userId: string;
  avatarFileName: string | undefined;
}

export default class UpdateUserAvatarService {
  public async execute({ avatarFileName, userId }: IRequest): Promise<User | undefined> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(userId);

    if (!user) throw new AppError("User not found.", 404);

    if (user.avatar) {
      const userAvatarFilePath = path.join(
        uploadConfig.directory,
        user.avatar
      );

      const userAvatarFileExists = await fs.promises.stat(
        userAvatarFilePath
      );

      if (userAvatarFileExists)
        await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatarFileName ?? null;
    const response = await usersRepository.save(user);

    return response;
  }
}
