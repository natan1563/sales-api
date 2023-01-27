import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductsRepository from "../typeorm/repositories/ProductsRepository";
import RedisCache from "@shared/cache/RedisCache";
import { CacheKeys } from "../enum/CacheKeys";

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default class UpdateProductService {
  public async execute({id, name, price, quantity}: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const product = await productsRepository.findOne(id);

    if (!product)
      throw new AppError('Product not found', 404);

    const productNameExists = await productsRepository.findByName(name);
    if (productNameExists && productNameExists.id !== id)
      throw new AppError('There is already one product with this name', 400);

    const redisCache = new RedisCache();
    await redisCache.invalidate(CacheKeys.listProduct)

    product.name     = name;
    product.price    = price;
    product.quantity = quantity;

    productsRepository.save(product);

    return product;
  }
}
