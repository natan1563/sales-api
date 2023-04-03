import { inject, injectable } from "tsyringe";
import { IPaginateCustomer } from "../domain/models/IPaginateCustomer";
import CustomersRepository from "../infra/typeorm/repositories/CustomersRepository";


interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
export default class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: CustomersRepository
  ) {}

  public async execute({
    page,
    limit
  }: SearchParams): Promise<IPaginateCustomer> {
    const take = limit;
    const skip = (Number(page) - 1) * take
    const customers = await this.customersRepository.findAll({
      take,
      skip,
      page
    });

    return customers as IPaginateCustomer;
  }
}
