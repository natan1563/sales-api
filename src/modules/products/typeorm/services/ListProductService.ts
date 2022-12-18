import { getCustomRepository } from "typeorm";
import Product from "../entities/Product";
import ProductsRepository from "../repositories/ProductsRepository";


export default class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const products = productsRepository.find();

    return products
  }
}
