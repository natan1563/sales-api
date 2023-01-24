import { EntityRepository, Repository } from "typeorm";
import Order from "../entities/Order";
import Customer from "@modules/customers/typeorm/entities/Customer";
import Product from "@modules/products/typeorm/entities/Product";

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[];
}

@EntityRepository(Order)
export default class OrdersRepository extends Repository<Order> {
  public async findByid(id: string): Promise<Order | undefined> {
    return await this.findOne(
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
  }: IRequest): Promise<Order | undefined> {
    const order = this.create({
      customer,
      orders_products: products
    })

    return await this.save(order);
  }
}
