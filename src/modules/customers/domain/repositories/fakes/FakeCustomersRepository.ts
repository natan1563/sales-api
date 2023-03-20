// import Customer from "../entities/Customer";
import { ICustomerRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import { ICreateCustomer } from "@modules/customers/domain/models/ICreateCustomer";
import { v4 as uuidv4 } from 'uuid'
import Customer from "@modules/customers/infra/typeorm/entities/Customer";

export default class FakeCustomersRepository implements ICustomerRepository {
  private customers: Customer[] = []

  public async create({name, email}: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();

    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }

  public async paginate() {
    return undefined;
  }

  public async save(customer: Customer): Promise<Customer> {
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id
    )

    this.customers[findIndex] = customer
    return customer;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    return this.customers.find(customer => customer.name === name);
  }

  public async findById(id: string): Promise<Customer | undefined> {
    return this.customers.find(customer => customer.id === id);

  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    return this.customers.find(customer => customer.email === email);
  }

  public async remove(customer: Customer) {
    this.customers = this.customers.filter(currentCustomer => currentCustomer.id !== customer.id)
  }
}
