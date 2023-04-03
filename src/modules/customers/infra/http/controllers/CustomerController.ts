import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';

import ListCustomerService   from '@modules/customers/services/ListCustomerService';
import ShowCustomerService   from '@modules/customers/services/ShowCustomerService';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';
import DeleteCustomerService from '@modules/customers/services/DeleteCustomerService';
import { container } from 'tsyringe';

export default class CustomerController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1
    const limit = request.query.limit ? Number(request.query.limit) : 15

    const listCustomersService = container.resolve(ListCustomerService);
    const listOfCustomers = await listCustomersService.execute({
      page,
      limit
    });

    return response.json(listOfCustomers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (!id)
      throw new AppError('Invalid parsed id', 400);

    const showCustomerService = container.resolve(ShowCustomerService);
    const customer = await showCustomerService.execute({ id });

    return response.json(customer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const createCustomer = container.resolve(CreateCustomerService);
    const customer = await createCustomer.execute({ name, email })

    return response.json(customer);
  }

  public async update (request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email } = request.body;

    const updateCustomerService = container.resolve(UpdateCustomerService);
    const customer = await updateCustomerService.execute({ id, name, email });

    return response.json(customer);
  }

  public async delete (request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteCustomerService = container.resolve(DeleteCustomerService);

    await deleteCustomerService.execute({ id });

    return response
          .status(204)
          .end();
  }
}
