import { PaginationAwareObject } from "typeorm-pagination/dist/helpers/pagination";
import { ICreateCustomer } from "../models/ICreateCustomer";
import { ICustomer } from "../models/ICustomer";

export interface ICustomerRepository {
  findByName(name: string): Promise<ICustomer | undefined>;
  findById(id: string): Promise<ICustomer | undefined>;
  findByEmail(email: string): Promise<ICustomer | undefined>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
  paginate(): Promise<PaginationAwareObject>;
  remove(customer: ICustomer): Promise<void>;
}
