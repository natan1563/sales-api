import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import ProductsRepository from "../infra/typeorm/repositories/ProductsRepository"
import redisCache from "@shared/cache/RedisCache";
import { CacheKeys } from "../enum/CacheKeys";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepository
  ) {}

  public async execute({name, price, quantity}: IRequest ) {
    const productExists = await this.productsRepository.findByName(name)

    if (productExists)
      throw new AppError('There is already a product with the name ' + name)


    const product = this.productsRepository.create({
      name,
      price,
      quantity
    })

    await redisCache.invalidate(CacheKeys.listProduct)

    return this.productsRepository.save(product)
  }
}
