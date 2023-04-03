import { Repository } from "typeorm";
import Customer from "../entities/Customer";
import { ICustomerRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import { ICreateCustomer } from "@modules/customers/domain/models/ICreateCustomer";
import { dataSource } from "@shared/infra/typeorm";
import { SearchParams } from "@modules/customers/domain/repositories/ICustomersRepository";
import { IPaginateCustomer } from "@modules/customers/domain/models/IPaginateCustomer";
export default class CustomersRepository implements ICustomerRepository {
  private ormRepository: Repository<Customer>

  constructor() {
    this.ormRepository = dataSource.getRepository(Customer);
  }

  public async create({name, email}: ICreateCustomer): Promise<Customer> {
    const customer = this.ormRepository.create({
      name,
      email
    });

    return await this.ormRepository.save(customer);
  }

  public async findAll({page, skip, take}: SearchParams): Promise<IPaginateCustomer | null> {
    const [
      customers,
      count
    ] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: customers
    };

    return result
  }

  public async save(customer: Customer): Promise<Customer> {
    return await this.ormRepository.save(customer);
  }

  public async findByName(name: string): Promise<Customer | null> {
    return await this.ormRepository.findOneBy({ name })
  }

  public async findById(id: string): Promise<Customer | null> {
    return await this.ormRepository.findOneBy({id});
  }

  public async findByEmail(email: string): Promise<Customer | null> {
    return await this.ormRepository.findOneBy({ email })
  }

  public async remove(customer: Customer): Promise<void> {
    await this.ormRepository.remove(customer);
  }
}
