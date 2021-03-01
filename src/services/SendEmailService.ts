import nodemailer, { Transporter } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
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

    async execute(to:string,subject:string,body:string){
        const msg = await this.client.sendMail({
            to,
            subject,
            html:body,
            from:"MATHEUS <noreply@nps.com.br>"
        });

        console.log("Mensage sent: %s",msg.messageId);
        console.log("Preview link %s ",nodemailer.getTestMessageUrl(msg))
    }

}

export default new SendMailService()