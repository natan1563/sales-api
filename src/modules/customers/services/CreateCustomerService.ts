import { getCustomRepository } from "typeorm";
import CustomersRepository from "../infra/typeorm/repositories/CustomersRepository";
import AppError from "@shared/errors/AppError";
import Customer from "../infra/typeorm/entities/Customer";

interface IRequest {
  name: string;
  email: string;
}

export default class CreateCustomerService {
  public async execute({ name, email}: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);
    const emailExists = await customerRepository.findByEmail(email);

    if (emailExists)
      throw new AppError('Email already used', 400);

    const customer = customerRepository.create({
      name,
      email,
    })

    await customerRepository.save(customer);

    return customer;
  }
}
