
import User from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  user_id: string;
}

@injectable()
export default class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository
  ) {}

  public async execute({user_id}: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user)
      throw new AppError("User not found", 404);

    return user;
  }
}
