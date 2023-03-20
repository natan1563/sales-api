import { compare, hash } from "bcryptjs";
import { IHashProvider } from "../models/IHashProvider";
import authConfig from '@config/auth';

export class BcryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, Number(authConfig.jwt.salt));
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
