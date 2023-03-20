// import User from "../entities/User";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { ICreateUser } from "@modules/users/domain/models/ICreateUser";
import { v4 as uuidv4 } from 'uuid'
import User from "@modules/users/infra/typeorm/entities/User";
import { IUser } from "../../models/IUser";

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = []

  public create ({ name, email, password}: ICreateUser): User {
    const user = new User();

    user.id = uuidv4();
    user.name = name;
    user.email = email;
    user.password = password;

    this.users.push(user);

    return user;
  }

  public async listUsers(): Promise<IUser[]> {
    return this.users;
  }

  public async save(user: User): Promise<IUser | undefined> {
    const findIndex = this.users.findIndex(
      findUser => findUser.id === user.id
    )

    this.users[findIndex] = user
    return user;
  }

  public async findByName(name: string): Promise<User | undefined> {
    return this.users.find(user => user.name === name);
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);

  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  public async remove(user: User) {
    this.users = this.users.filter(currentUser => currentUser.id !== user.id)
  }
}
