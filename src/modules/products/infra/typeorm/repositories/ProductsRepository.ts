import { EntityRepository, In, Repository } from "typeorm";
import Product from "../entities/Product";

interface IFindProducts {
  id: string;
}

@EntityRepository(Product)
export default class ProductsRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    return await this.findOne({
      where: { name }
    })
  }

  public async findByAllByIds(product_ids: IFindProducts[]): Promise<Product[]> {
    const productsIds = product_ids.map(product => product.id);
    const existsProducts = await this.find({
      where: {
        id: In(productsIds)
      }
    })

    return existsProducts;
  }
}
