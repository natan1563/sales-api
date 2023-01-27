import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductsRepository from "../typeorm/repositories/ProductsRepository";
import RedisCache from '@shared/cache/RedisCache';
import { CacheKeys } from "../enum/CacheKeys"
export default class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      CacheKeys.listProduct
    );

    if (!products) {
      products = await productsRepository.find();

      await redisCache.save(CacheKeys.listProduct, products);
    }

    return products
  }
}
