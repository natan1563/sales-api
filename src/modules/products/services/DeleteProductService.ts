import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import ProductsRepository from "../typeorm/repositories/ProductsRepository";
import { CacheKeys } from "../enum/CacheKeys";
import RedisCache from "@shared/cache/RedisCache";

interface IRequest {
  id: string;
}

export default class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository: ProductsRepository = getCustomRepository(ProductsRepository);
    const product = await productsRepository.findOne(id);

    if (!product)
      throw new AppError('Product not found', 404);

    const redisCache = new RedisCache();
    await redisCache.invalidate(CacheKeys.listProduct)

    await productsRepository.remove(product)
  }
}
