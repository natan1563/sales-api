import CustomersRepository from "../infra/typeorm/repositories/CustomersRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IRequestUpdateCustomer } from "../domain/models/IRequestUpdateCustomer";
import { ICustomer } from "../domain/models/ICustomer";

@injectable()
export default class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: CustomersRepository
  ) {}

  public async execute({
      id,
      name,
      email,
    }: IRequestUpdateCustomer): Promise<ICustomer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer)
      throw new AppError("Customer not found", 404);

    const customerEmailExists = await this.customersRepository.findByEmail(email);
    if (customerEmailExists && customerEmailExists.id !== customer.id)
      throw new AppError("There is already one customer with this email.", 400);

    customer.name = name;
    customer.email = email;

    await this.customersRepository.save(customer);
    return customer;
  }
}
