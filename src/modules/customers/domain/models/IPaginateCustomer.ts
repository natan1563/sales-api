import Customer from "@modules/customers/infra/typeorm/entities/Customer";

export interface IPaginateCustomer {
  per_page: number;
  total: number;
  current_page: number;
  data: Customer[];
}
