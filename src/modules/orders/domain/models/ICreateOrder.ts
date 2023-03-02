import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { IProductFromOrder } from "./IProductFromOrder";

export interface ICreateOrder {
  customer: ICustomer;
  products: IProductFromOrder[];
}
