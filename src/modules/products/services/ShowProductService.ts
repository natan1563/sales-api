import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IProduct } from "../domain/models/IProduct";
import ProductsRepository from "../infra/typeorm/repositories/ProductsRepository";

@injectable()
export default class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepository
  ) {}

  public async execute(id: string): Promise<IProduct> {
    const product = await this.productsRepository.findById(id)

    if (!product)
      throw new AppError('Product not found', 404)

    return product;
  }
}
