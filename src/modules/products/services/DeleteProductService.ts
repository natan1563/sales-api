import AppError from "@shared/errors/AppError";
import ProductsRepository from "../infra/typeorm/repositories/ProductsRepository";
import { CacheKeys } from "../enum/CacheKeys";
import redisCache from "@shared/cache/RedisCache";
import { IFindProduct } from "../domain/models/IFindProduct";
import { inject, injectable } from "tsyringe";

@injectable()
export default class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepository
  ) {}

  public async execute({ id }: IFindProduct): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product)
      throw new AppError('Product not found', 404);

    await redisCache.invalidate(CacheKeys.listProduct)

    await this.productsRepository.remove(product)
  }
}
