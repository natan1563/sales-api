import { container } from 'tsyringe';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';

import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

container.registerSingleton<ICustomerRepository>(
  'CustomersRepository',
  CustomersRepository
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository
);
