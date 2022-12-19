import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../entities/Product";
import ProductsRepository from "../repositories/ProductsRepository";

interface IRequest {
  id: string;
}

export default class ShowProductService {
  public async execute({id}: IRequest): Promise<Product | undefined> {
    const productsRepository = getCustomRepository(ProductsRepository)
    const product = productsRepository.findOne(id)

    if (!product)
      throw new AppError('Product not found', 404)

    return product;
  }
}
