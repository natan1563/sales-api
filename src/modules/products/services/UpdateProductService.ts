import AppError from "@shared/errors/AppError";
import Product from "../infra/typeorm/entities/Product";
import ProductsRepository from "../infra/typeorm/repositories/ProductsRepository";
import redisCache from "@shared/cache/RedisCache";
import { CacheKeys } from "../enum/CacheKeys";
import { inject, injectable } from "tsyringe";
import { IProductSaveRequired } from "../domain/models/IProductSaveRequired";

@injectable()
export default class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepository
  ) {}

  public async execute({id, name, price, quantity}: IProductSaveRequired): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product)
      throw new AppError('Product not found', 404);

    const productNameExists = await this.productsRepository.findByName(String(name));
    if (productNameExists && productNameExists.id !== id)
      throw new AppError('There is already one product with this name', 400);

    await redisCache.invalidate(CacheKeys.listProduct)

    product.name     = name;
    product.price    = price;
    product.quantity = quantity;

    return this.productsRepository.save(product);
  }
}
