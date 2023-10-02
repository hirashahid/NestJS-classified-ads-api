import { UserType, RoleType, Gender } from 'src/modules/user/constants/user';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1695714099167 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'uuid', type: 'varchar(145)' },
          { name: 'name', type: 'varchar(145)' },
          { name: 'email', type: 'varchar(145)' },
          { name: 'password', type: 'text' },
          { name: 'type', type: 'enum', enum: Object.values(UserType) },
          {
            name: 'role',
            type: 'enum',
            enum: Object.values(RoleType),
            isNullable: true,
          },
          { name: 'phone', type: 'varchar(50)' },
          { name: 'birth_date', type: 'date', isNullable: true },
          {
            name: 'gender',
            type: 'enum',
            enum: Object.values(Gender),
            isNullable: true,
          },
          { name: 'address', type: 'varchar(145)', isNullable: true },
          { name: 'salt', type: 'varchar(96)', isNullable: true },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
