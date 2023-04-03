import { ICreateCustomer } from "../models/ICreateCustomer";
import { ICustomer } from "../models/ICustomer";
import { IPaginateCustomer } from "../models/IPaginateCustomer";

export type SearchParams = {
  page: number,
  skip: number,
  take: number
}

export interface ICustomerRepository {
  findAll(params: SearchParams): Promise<IPaginateCustomer | null>;
  findByName(name: string): Promise<ICustomer | null>;
  findById(id: string): Promise<ICustomer | null>;
  findByEmail(email: string): Promise<ICustomer | null>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
  remove(customer: ICustomer): Promise<void>;
}
