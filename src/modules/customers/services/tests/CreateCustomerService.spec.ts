import FakeCustomersRepository from "@modules/customers/domain/repositories/fakes/FakeCustomersRepository"
import CreateCustomerService from "../CreateCustomerService";

describe('CreateCustomer', () => {
  it ('should be able to create a new customer', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const createCustomer = new CreateCustomerService(fakeCustomersRepository);

    const customer = await createCustomer.execute({
      name: 'Jorge Aluizio',
      email: 'teste@teste.com'
    })

    expect(customer).toHaveProperty('id')
  })
})
