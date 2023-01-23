import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddOrderIdToOrdersProducts1674516045462 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'orders_products',
        new TableColumn({
            name: 'order_id',
            type: 'uuid',
            isNullable: true,
        }));

        await queryRunner.createForeignKey(
          'orders_products',
          new TableForeignKey({
            name: 'OrdersProductsOrder',
            columnNames: ['order_id'],
            referencedTableName: 'orders',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL'
          })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.dropForeignKey('orders_products', 'OrdersProductsOrder');
      queryRunner.dropColumn('orders_products', 'order_id');
    }

}
