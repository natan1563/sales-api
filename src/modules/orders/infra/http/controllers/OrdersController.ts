import { Request, Response } from 'express';
import ShowOrderService from '@modules/orders/services/ShowOrderService';
import CreateOrderService from '@modules/orders/services/CreateOrderService';
import { container } from 'tsyringe';


export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrderService = container.resolve(ShowOrderService);
    const order = await showOrderService.execute({ id });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;
    const createOrderService = container.resolve(CreateOrderService);
    const order = await createOrderService.execute({ customer_id, products })

    return response
            .status(201)
            .json(order);
  }
}
