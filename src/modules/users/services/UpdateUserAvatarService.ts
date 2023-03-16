import { getCustomRepository } from "typeorm";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import DiskStorageProvider from "@shared/providers/StorageProvider/DiskStorageProvider";
import uploadConfig from '@config/upload';
import S3StorageProvider from "@shared/providers/StorageProvider/S3StorageProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
  userId: string;
  avatarFileName: string | undefined;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository
  ) {}

  public async execute({ avatarFileName, userId }: IRequest): Promise<User | undefined> {
    const storageProvider = (uploadConfig.driver === 's3') ? new S3StorageProvider() : new DiskStorageProvider();

    const user = await this.usersRepository.findById(userId);
    if (!user)
      throw new AppError("User not found.", 404);

    if (user.avatar)
      await storageProvider.deleteFile(user.avatar);

    if (avatarFileName)
      await storageProvider.saveFile(avatarFileName);

    user.avatar = avatarFileName ?? null;
    const response = await this.usersRepository.save(user);

    return response;
  }
}
