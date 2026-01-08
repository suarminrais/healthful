import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1767837447275 implements MigrationInterface {
    name = 'InitialMigration1767837447275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contents" ("id" character varying NOT NULL, "title" character varying(255) NOT NULL, "published_date" date, "description" text NOT NULL, "type" "public"."contents_type_enum" NOT NULL, "subscription_type" "public"."contents_subscription_type_enum" NOT NULL DEFAULT 'free', CONSTRAINT "PK_b7c504072e537532d7080c54fac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscriptions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "type" "public"."subscriptions_type_enum" NOT NULL, "price" double precision NOT NULL, CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "subscription_id" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" uuid, "tag_id" uuid, CONSTRAINT "PK_deef7519b4b9995a9ecc3f7e611" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "content_tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "content_id" character varying, "tag_id" uuid, CONSTRAINT "PK_6a24e5245d735b48bfe9ca5c1cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b6bb02f6cd87c7ae80f1bbb9339" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_tags" ADD CONSTRAINT "FK_1876d8f8eff4211b216364381ec" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_tags" ADD CONSTRAINT "FK_082dadc021168fef6e1afd42ad7" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "content_tags" ADD CONSTRAINT "FK_b957bee53dd842e59e479e9afde" FOREIGN KEY ("content_id") REFERENCES "contents"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "content_tags" ADD CONSTRAINT "FK_2346c63b132eacb6cf5a8ccaacd" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content_tags" DROP CONSTRAINT "FK_2346c63b132eacb6cf5a8ccaacd"`);
        await queryRunner.query(`ALTER TABLE "content_tags" DROP CONSTRAINT "FK_b957bee53dd842e59e479e9afde"`);
        await queryRunner.query(`ALTER TABLE "user_tags" DROP CONSTRAINT "FK_082dadc021168fef6e1afd42ad7"`);
        await queryRunner.query(`ALTER TABLE "user_tags" DROP CONSTRAINT "FK_1876d8f8eff4211b216364381ec"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b6bb02f6cd87c7ae80f1bbb9339"`);
        await queryRunner.query(`DROP TABLE "content_tags"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "user_tags"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "subscriptions"`);
        await queryRunner.query(`DROP TABLE "contents"`);
    }

}
