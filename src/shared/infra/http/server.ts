import 'reflect-metadata';
import 'dotenv/config';
import { app } from './app';
import { dataSource } from '../typeorm';

dataSource.initialize().then(() => {
  const serverPort = process.env.APP_PORT || 3333
  app.listen(serverPort, () => {
    console.log(`Server started on port ${serverPort}!`);
  });
})
