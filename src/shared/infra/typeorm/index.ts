import { DataSource } from 'typeorm'

import User from '@modules/users/infra/typeorm/entities/User'
import UserToken from '@modules/users/infra/typeorm/entities/UserToken'
import Customer from '@modules/customers/infra/typeorm/entities/Customer'
import Order from '@modules/orders/infra/typeorm/entities/Order'
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts'
import Product from '@modules/products/infra/typeorm/entities/Product'

import { CreateProducts1667738653904 } from './migrations/1667738653904-CreateProducts'
import { CreateUsers1671670887754 } from './migrations/1671670887754-CreateUsers'
import { CreateUserTokens1673619116014 } from 'dist/shared/infra/typeorm/migrations/1673619116014-CreateUserTokens'
import { CreateCustomers1674323730603 } from './migrations/1674323730603-CreateCustomers'
import { CreateOrders1674514868256 } from './migrations/1674514868256-CreateOrders'
import { AddCustomerIdToOrders1674515081985 } from './migrations/1674515081985-AddCustomerIdToOrders'
import { CreateOrdersProducts1674515740811 } from './migrations/1674515740811-CreateOrdersProducts'
import { AddOrderIdToOrdersProducts1674516045462 } from './migrations/1674516045462-AddOrderIdToOrdersProducts'
import { AddProductIdToOrdersProducts1674516251806 } from './migrations/1674516251806-AddProductIdToOrdersProducts'

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  entities: [User, UserToken, Customer, Order, OrdersProducts, Product],
  migrations: {
    CreateProducts1667738653904,
    CreateUsers1671670887754,
    CreateUserTokens1673619116014,
    CreateCustomers1674323730603,
    CreateOrders1674514868256,
    AddCustomerIdToOrders1674515081985,
    CreateOrdersProducts1674515740811,
    AddOrderIdToOrdersProducts1674516045462,
    AddProductIdToOrdersProducts1674516251806,
  }
})
