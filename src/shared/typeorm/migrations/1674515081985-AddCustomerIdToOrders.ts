import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddCustomerIdToOrders1674515081985 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'orders',
        new TableColumn({
            name: 'customer_id',
            type: 'uuid',
            isNullable: true,
        }));

        await queryRunner.createForeignKey(
          'orders',
          new TableForeignKey({
            name: 'OrdersCustomer',
            columnNames: ['customer_id'],
            referencedTableName: 'customers',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL'
          })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.dropForeignKey('orders', 'OrdersCustomer');
      queryRunner.dropColumn('orders', 'customer_id');
    }

}
