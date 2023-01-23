import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import ListCustomerService from '../services/ListCustomerService';
import ShowCustomerService from '../services/ShowCustomerService';
import CreateCustomerService from '../services/CreateCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';

export default class CustomerController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomersService = new ListCustomerService();
    const listOfCustomers = await listCustomersService.execute();

    return response.json(listOfCustomers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (!id)
      throw new AppError('Invalid parsed id', 400);

    const showCustomerService = new ShowCustomerService();
    const customer = await showCustomerService.execute({ id });

    return response.json(customer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const createCustomerService = new CreateCustomerService();
    const customer = await createCustomerService.execute({ name, email })

    return response.json(customer);
  }

  public async update (request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email } = request.body;

    const updateCustomerService = new UpdateCustomerService();
    const customer = await updateCustomerService.execute({ id, name, email });

    return response.json(customer);
  }

  public async delete (request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteCustomerService = new DeleteCustomerService();

    await deleteCustomerService.execute({ id });

    return response
          .status(204)
          .end();
  }
}
