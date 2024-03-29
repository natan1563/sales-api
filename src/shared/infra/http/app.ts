import { errors } from 'celebrate';
import express, { NextFunction, Request, response, Response } from 'express';
import { pagination } from 'typeorm-pagination';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import '@shared/container';
import uploadConfig from '@config/upload';
import rateLimiter from './middlewares/rateLimiter';

export const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimiter)

app.use(pagination);

app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(errors());
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({
        status: 'error',
        message: error.message
      });
  }

  return res
    .status(500)
    .json({
      status: 'error',
      raw: error.message,
      message: 'Internal Server Error'
    });
});
