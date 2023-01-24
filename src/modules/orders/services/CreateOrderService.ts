import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Order from "../typeorm/entities/Order";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";
import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import ProductsRepository from "@modules/products/typeorm/repositories/ProductsRepository";

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

export default class CreateOrderService {
  public async execute({
    customer_id,
    products
  }: IRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrdersRepository);
    const customerRepository = getCustomRepository(CustomersRepository);
    const productRepository = getCustomRepository(ProductsRepository);

    const customerExists = await customerRepository.findById(customer_id);
    if (!customerExists)
      throw new AppError('Could not find any customer with the given id.', 404);

    const productExists = await productRepository.findByAllByIds(products);

    if (!productExists.length)
      throw new AppError('Could not find any product with the given ids', 404);

    const existsProductsIds = productExists.map(product => product.id);
    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id)
    );

    if (checkInexistentProducts.length)
      throw new AppError(
        `Could not find any products ${checkInexistentProducts.map(item => item.id).toString()}
      `);

    const quantityAvailable = products.filter(
      product =>
        productExists
          .filter(
              existsProduct =>
                existsProduct.id === product.id
            )[0].quantity < product.quantity
    )

    if (quantityAvailable.length)
      throw new AppError(
        `The quantity of ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`
      );

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productExists.filter(p => p.id === product.id)[0].price
    }));

    const order = await orderRepository.createOrder({
      customer: customerExists,
      products: serializedProducts
    });

    const { orders_products } = order;

    const updatedProductQuantity = orders_products.map(product => ({
      id: product.product_id,
      quantity: productExists.filter(p => p.id === product.product_id)[0].quantity - product.quantity
    }))

    await productRepository.save(updatedProductQuantity);

    return order;
  }
}
