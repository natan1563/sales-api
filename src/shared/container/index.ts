import { container } from 'tsyringe';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';

import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import '@modules/users/providers'

container.registerSingleton<ICustomerRepository>(
  'CustomersRepository',
  CustomersRepository
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
);
