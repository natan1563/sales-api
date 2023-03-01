import { inject, injectable } from "tsyringe";
import { IPaginateCustomer } from "../domain/models/IPaginateCustomer";
import CustomersRepository from "../infra/typeorm/repositories/CustomersRepository";


@injectable()
export default class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: CustomersRepository
  ) {}

  public async execute(): Promise<IPaginateCustomer> {
    const customers = await this.customersRepository.paginate();
    return customers as IPaginateCustomer;
  }
}
