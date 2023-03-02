import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';

import ListProductService from '@modules/products/services/ListProductService';
import ShowProductService from '@modules/products/services/ShowProductService';
import CreateProductService from '@modules/products/services/CreateProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import { container } from 'tsyringe';

export default class ProductsController {
  public async index(_: Request, response: Response): Promise<Response> {
    const listProductsService = container.resolve(ListProductService);
    const listOfProducts = await listProductsService.execute();

    return response.json(listOfProducts);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (!id)
      throw new AppError('Invalid parsed id', 400);

    const showProductService = container.resolve(ShowProductService);
    const product = await showProductService.execute(id);

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const createProductService = container.resolve(CreateProductService);
    const product = await createProductService.execute({ name, price, quantity })

    return response.json(product);
  }

  public async update (request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;

    const updateProductService = container.resolve(UpdateProductService);
    const product = await updateProductService.execute({ id, name, price, quantity });

    return response.json(product);
  }

  public async delete (request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteProductService = container.resolve(DeleteProductService);

    await deleteProductService.execute({ id });

    return response
          .status(204)
          .end();
  }
}
