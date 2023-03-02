import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Order from "../infra/typeorm/entities/Order";
import OrdersRepository from "../infra/typeorm/repositories/OrdersRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
}

@injectable()
export default class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: OrdersRepository
  ) {}

  public async execute({
    id
  }: IRequest): Promise<Order> {
    const order = await this.ordersRepository.findById(id);
    if (!order)
      throw new AppError('Order not found.', 404);

    return order;
  }
}
