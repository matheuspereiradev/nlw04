import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveyUser1614530651020 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name:"surveys_users",
            columns:[{
                name:"id",
                isPrimary:true,
                type:"uuid"
            },{
                name:"user_id",
                type:"uuid"
            },{
                name:"survey_id",
                type:"uuid"
            },{
                name:"value",
                type:"number",
                isNullable:true
            },{
                name:"created_at",
                type:"timestamp",
                default:"now()"
            }],
            foreignKeys:[{
                name:"FKUser",
                referencedTableName:"users",
                referencedColumnNames:["id"],
                columnNames:["user_id"],
                onDelete:"CASCADE",
                onUpdate:"CASCADE"
            },{
                name:"FKSurvey",
                referencedTableName:"surveys",
                referencedColumnNames:["id"],
                columnNames:["survey_id"],
                onDelete:"CASCADE",
                onUpdate:"CASCADE"
            }]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("surveys_users");
    }

}
