import {Column, CreateDateColumn, Entity, PrimaryColumn} from "typeorm"
import {v4 as uuid} from 'uuid'

@Entity("surveys_users")
class SurveyUser{

    @PrimaryColumn()
    readonly id:string;

    @Column() //caso o nome seja diferente fazer isso @Column("Nome")
    user_id:string;

    @Column()
    survey_id:string;

    @Column()
    value:string;

    @CreateDateColumn()
    created_at:Date;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export{SurveyUser};