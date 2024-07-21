import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1721532940118 implements MigrationInterface {
    name = 'Migrations1721532940118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`test\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`test\``);
    }

}
