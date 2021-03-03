import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm"
import {v4 as uuid} from 'uuid'
import { Users } from "./Users";
import { Surveys } from "./Surveys"

@Entity("surveys_users")
class SurveyUser{

    @PrimaryColumn()
    readonly id:string;

    @Column() //caso o nome seja diferente fazer isso @Column("Nome")
    user_id:string;

    @ManyToOne(()=>Users)
    @JoinColumn({name:"user_id"})
    user:Users

    @Column()
    survey_id:string;

    @ManyToOne(()=>Surveys)
    @JoinColumn({name:"survey_id"})
    survey:Surveys

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