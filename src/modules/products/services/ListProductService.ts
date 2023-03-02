import { getCustomRepository } from "typeorm";
import Product from "../infra/typeorm/entities/Product";
import ProductsRepository from "../infra/typeorm/repositories/ProductsRepository";
import redisCache from '@shared/cache/RedisCache';
import { CacheKeys } from "../enum/CacheKeys"
import { inject, injectable } from "tsyringe";

@injectable()
export default class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepository
  ) {}
  public async execute(): Promise<Product[]> {
    let products = await redisCache.recover<Product[]>(
      CacheKeys.listProduct
    );

    if (!products) {
      products = await this.productsRepository.findAll();

      await redisCache.save(CacheKeys.listProduct, products);
    }

    return products
  }
}
