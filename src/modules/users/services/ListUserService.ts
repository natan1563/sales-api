import { inject, injectable } from "tsyringe";
import User from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";

@injectable()
export default class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository
  ) {}

  public async execute(): Promise<User[]> {
    return await this.usersRepository.listUsers();
  }
}
