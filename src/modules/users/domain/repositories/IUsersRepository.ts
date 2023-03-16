import User from "@modules/users/infra/typeorm/entities/User";
import { ICreateUser } from "../models/ICreateUser";
import { IUser } from "../models/IUser";

export interface IUsersRepository {
  listUsers(): Promise<IUser[]>

  findByName(name: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  findByEmail(string: string): Promise<IUser | undefined>;

  create(user: ICreateUser): User;
  save(user: IUser): Promise<IUser | undefined>;
}
