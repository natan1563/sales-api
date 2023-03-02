import { IOrdersProducts } from "@modules/orders/domain/models/IOrdersProducts";

export interface IProductSaveRequired {
  id: string;
  orders_products?: IOrdersProducts[];
  name: string;
  price: number;
  quantity: number;
}
