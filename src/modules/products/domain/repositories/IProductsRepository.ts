import { IFindProducts } from "@modules/products/infra/typeorm/entities/IFindProducts";
import { IProduct } from "../models/IProduct";
import { IProductUpdate } from "../models/IProductUpdate";

export interface IProductsRepository {
  findByName(name: string): Promise<IProduct | undefined>;
  findAllByIds(products_id: IFindProducts[]): Promise<IProduct[]>;
  updateProduct(products: IProductUpdate[]): Promise<IProduct[]>;
}
