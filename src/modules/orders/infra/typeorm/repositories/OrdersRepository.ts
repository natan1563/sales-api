import { ICreateOrder } from "@modules/orders/domain/models/ICreateOrder";
import { IOrder } from "@modules/orders/domain/models/IOrder";
import { IOrdersRepository } from "@modules/orders/domain/repositories/IOrdersRepository";
import { getRepository, Repository } from "typeorm";
import Order from "../entities/Order";

export default class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async findById(id: string): Promise<Order | undefined> {
    return await this.ormRepository.findOne(
      id,
      {
        relations: [
          'customer',
          'orders_products'
        ]
      }
    );
  }

  public async createOrder({
    customer,
    products,
  }: ICreateOrder): Promise<IOrder> {
    const order = this.ormRepository.create({
      customer,
      orders_products: products
    })

    return await this.ormRepository.save(order);
  }
}
