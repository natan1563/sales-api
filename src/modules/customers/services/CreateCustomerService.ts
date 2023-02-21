import AppError from "@shared/errors/AppError";
import { ICustomerRepository } from "../domain/repositories/ICustomersRepository";
import { ICreateCustomer } from "../domain/models/ICreateCustomer";
import { ICustomer } from "../domain/models/ICustomer";

export default class CreateCustomerService {
  constructor(private customersRepository: ICustomerRepository) {}

  public async execute({ name, email}: ICreateCustomer): Promise<ICustomer> {
    const emailExists = await this.customersRepository.findByEmail(email);

    if (emailExists)
      throw new AppError('Email already used', 400);

    const customer = await this.customersRepository.create({
      name,
      email,
    })

    return customer;
  }
}
