
import CustomersRepository from "../infra/typeorm/repositories/CustomersRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
}

@injectable()
export default class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: CustomersRepository
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const customer = await this.customersRepository.findById(id);

    if (!customer)
      throw new AppError("Customer not found", 404);

    await this.customersRepository.remove(customer);
  }
}
