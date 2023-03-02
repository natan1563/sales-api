import { IProduct } from "@modules/products/domain/models/IProduct";
import { Product } from "aws-sdk/clients/ssm";
import { IOrder } from "./IOrder";

export interface IOrdersProducts {
  id: string;
  order_id: string;
  product_id: string;
  order: IOrder;
  product: IProduct;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}
