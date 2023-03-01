import { getCustomRepository } from "typeorm";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import DiskStorageProvider from "@shared/providers/StorageProvider/DiskStorageProvider";
import uploadConfig from '@config/upload';
import S3StorageProvider from "@shared/providers/StorageProvider/S3StorageProvider";

interface IRequest {
  userId: string;
  avatarFileName: string | undefined;
}

export default class UpdateUserAvatarService {
  public async execute({ avatarFileName, userId }: IRequest): Promise<User | undefined> {
    const usersRepository = getCustomRepository(UsersRepository);
    const storageProvider = (uploadConfig.driver === 's3') ? new S3StorageProvider() : new DiskStorageProvider();

    const user = await usersRepository.findById(userId);
    if (!user)
      throw new AppError("User not found.", 404);

    if (user.avatar)
      await storageProvider.deleteFile(user.avatar);

    if (avatarFileName)
      await storageProvider.saveFile(avatarFileName);

    user.avatar = avatarFileName ?? null;
    const response = await usersRepository.save(user);

    return response;
  }
}
