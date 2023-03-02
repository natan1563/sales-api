import { IProduct } from "@modules/products/domain/models/IProduct";
import { IProductSave } from "@modules/products/domain/models/IProductSave";
import { IProductsRepository } from "@modules/products/domain/repositories/IProductsRepository";
import {  getRepository, In, Repository } from "typeorm";
import { IFindProduct } from "../../../domain/models/IFindProduct";
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
  public async findById(id: string): Promise<IProduct | undefined> {
    return await this.ormRepository.findOne(id);
  }

  public async findAll(): Promise<Product[]> {
    return await this.ormRepository.find();
  }

  public async findAllByIds(product_ids: IFindProduct[]): Promise<Product[]> {
    const productsIds = product_ids.map(product => product.id);
    const existsProducts = await this.ormRepository.find({
      where: {
        id: In(productsIds)
      }
    })

    return existsProducts;
  }

  public async updateProduct(products: IProductSave[]): Promise<Product[]> {
    return this.ormRepository.save(products);
  }

  public create(product: IProductSave): IProduct {
    return this.ormRepository.create(product);
  }

  public async save(product: IProduct) {
    return await this.ormRepository.save(product);
  }

  public async remove(product: IProduct): Promise<void> {
    await this.ormRepository.remove(product as Product);
  }
}
