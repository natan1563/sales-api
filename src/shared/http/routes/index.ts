import { Router } from 'express'
import productsRouter from '@modules/products/routes/products.routes'
import usersRouter from '@modules/users/routes/users.routes';
import profileRouter from '@modules/users/routes/profile.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import customersRouter from '@modules/customers/routes/customer.routes';
import ordersRouter from '@modules/orders/routes/orders.routes';

const routes = Router();

routes.use('/products',  productsRouter);
routes.use('/password',  passwordRouter);
routes.use('/users',     usersRouter);
routes.use('/profile',   profileRouter);
routes.use('/sessions',  sessionsRouter);
routes.use('/customers', customersRouter);
routes.use('/orders',    ordersRouter);

export default routes;
