import { IFindProduct } from "@modules/products/domain/models/IFindProduct";
import { IProduct } from "../models/IProduct";
import { IProductSave } from "../models/IProductSave";

export interface IProductsRepository {
  findByName(name: string): Promise<IProduct | undefined>;
  findById(id: string): Promise<IProduct | undefined>;
  findAll(): Promise<IProduct[]>;
  findAllByIds(products_id: IFindProduct[]): Promise<IProduct[]>;
  updateProduct(products: IProductSave[]): Promise<IProduct[]>;
  create(product: IProductSave): IProduct;
  save(product: IProduct): Promise<IProduct>;
  remove(product: IProduct): Promise<void>;
}
