import { IUserTokens } from "../models/IUserTokens";

export interface IUserTokensRepository {
  findByToken(token: string): Promise<IUserTokens | undefined>;
  generate(user_id: string): Promise<IUserTokens>;
}
