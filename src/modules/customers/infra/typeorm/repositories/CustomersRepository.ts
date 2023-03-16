import { getRepository, Repository } from "typeorm";
import Customer from "../entities/Customer";
import { ICustomerRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import { ICreateCustomer } from "@modules/customers/domain/models/ICreateCustomer";
import { PaginationAwareObject } from "typeorm-pagination/dist/helpers/pagination";

export default class CustomersRepository implements ICustomerRepository {
  private ormRepository: Repository<Customer>

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async create({name, email}: ICreateCustomer): Promise<Customer> {
    const customer = this.ormRepository.create({
      name,
      email
    });

    return await this.ormRepository.save(customer);
  }

  public async paginate(): Promise<PaginationAwareObject | undefined> {
    return await this.ormRepository.createQueryBuilder().paginate();
  }

  public async save(customer: Customer): Promise<Customer> {
    return await this.ormRepository.save(customer);
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    return await this.ormRepository.findOne({
      where: { name }
    })
  }

  public async findById(id: string): Promise<Customer | undefined> {
    return await this.ormRepository.findOne(id);
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    return await this.ormRepository.findOne({
      where: { email }
    })
  }

  public async remove(customer: Customer): Promise<void> {
    await this.ormRepository.remove(customer);
  }
}
