import 'reflect-metadata';
import { errors } from 'celebrate';
import express, { NextFunction, Request, response, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());

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

  console.log(error.message);
  return res
    .status(500)
    .json({
      status: 'error',
      message: 'Internal Server Error'
    });
});

app.listen(3333, () => {
  console.log('Server started on port 3333! ');
});
