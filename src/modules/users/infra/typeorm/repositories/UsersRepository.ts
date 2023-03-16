import { ICreateUser } from "@modules/users/domain/models/ICreateUser";
import { IUser } from "@modules/users/domain/models/IUser";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { getRepository, Repository } from "typeorm";
import User from "../entities/User";

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async listUsers(): Promise<User[]> {
    return await this.ormRepository.find();
  }

  public async findByName(name: string): Promise<User | undefined> {
    return await this.ormRepository.findOne({
      where: { name }
    })
  }

  public async findById(id: string): Promise<User | undefined> {
    return await this.ormRepository.findOne(id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return await this.ormRepository.findOne({
      where: { email }
    })
  }

  public create(user: ICreateUser): User{
    return this.ormRepository.create(user);
  }

  public async save(user: IUser): Promise<User> {
    return await this.ormRepository.save(user);
  }
}
