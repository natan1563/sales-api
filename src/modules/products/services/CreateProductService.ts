import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import ProductsRepository from "../typeorm/repositories/ProductsRepository"
import redisCache from "@shared/cache/RedisCache";
import { CacheKeys } from "../enum/CacheKeys";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export default class CreateProductService {
  public async execute({name, price, quantity}: IRequest ) {
    const productsRepository = getCustomRepository(ProductsRepository);
    const productExists = await productsRepository.findByName(name)

    if (productExists)
      throw new AppError('There is already a product with the name ' + name)


    const product = productsRepository.create({
      name,
      price,
      quantity
    })

    await redisCache.invalidate(CacheKeys.listProduct)

    await productsRepository.save(product)

    return product
  }
}
