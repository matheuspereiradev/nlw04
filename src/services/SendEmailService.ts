import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import {resolve} from 'path';
import handlebar from 'handlebars';
import fs from 'fs';

class SendMailService {
    private client:Transporter;  

    constructor(){
        nodemailer.createTestAccount().then(account =>{
            const transporter = nodemailer.createTransport({
                host:account.smtp.host,
                port:account.smtp.port,
                secure:account.smtp.secure,
                auth:{
                    user:account.user,
                    pass:account.pass
                }
            });

            this.client = transporter;
        });
    }

    async execute(to:string,subject:string,variables:object,path:string){
        const templateFileContent = fs.readFileSync(path).toString('utf-8');
        const mailTemplateParse=handlebar.compile(templateFileContent);

        const html = mailTemplateParse(variables)

        const msg = await this.client.sendMail({
            to,
            subject,
            html,
            from:"MATHEUS <noreply@nps.com.br>"
        });

        console.log("Mensage sent: %s",msg.messageId);
        console.log("Preview link %s ",nodemailer.getTestMessageUrl(msg))
    }

}

export default new SendMailService()