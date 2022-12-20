import { Request, Response } from 'express';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import AppError from '@shared/errors/AppError';
import CreateProductService from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductService';
import DeleteProductService from '../services/DeleteProductService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProductsService = new ListProductService();
    const listOfProducts = await listProductsService.execute();

    return response.json(listOfProducts);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (!id)
      throw new AppError('Invalid parsed id', 400);

    const showProductService = new ShowProductService();
    const product = await showProductService.execute({ id });

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const createProductService = new CreateProductService();
    const product = await createProductService.execute({ name, price, quantity })

    return response.json(product);
  }

  public async update (request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;

    const updateProductService = new UpdateProductService();
    const product = await updateProductService.execute({ id, name, price, quantity });

    return response.json(product);
  }

  public async delete (request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteProductService = new DeleteProductService();

    await deleteProductService.execute({ id });

    return response
          .status(204)
          .end();
  }
}
