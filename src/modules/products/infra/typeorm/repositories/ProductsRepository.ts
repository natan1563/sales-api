import { IProductUpdate } from "@modules/products/domain/models/IProductUpdate";
import { IProductsRepository } from "@modules/products/domain/repositories/IProductsRepository";
import {  getRepository, In, Repository } from "typeorm";
import { IFindProducts } from "../entities/IFindProducts";
import Product from "../entities/Product";

export default class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findByName(name: string): Promise<Product | undefined> {
    return await this.ormRepository.findOne({
      where: { name }
    })
  }

  public async findAllByIds(product_ids: IFindProducts[]): Promise<Product[]> {
    const productsIds = product_ids.map(product => product.id);
    const existsProducts = await this.ormRepository.find({
      where: {
        id: In(productsIds)
      }
    })

    return existsProducts;
  }

  public async updateProduct(products: IProductUpdate[]): Promise<Product[]> {
    return this.ormRepository.save(products);
  }
}
