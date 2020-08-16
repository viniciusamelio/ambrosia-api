const nodemailer = require('nodemailer');

export class MailService{

    transporter;

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: 'smtp.umbler.com',
            port: 587,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD 
            }
        });
    }
    async sendWelcomeEmail(to:string,name:string){
        try {
            const response  = await this.transporter.sendMail({
                from: process.env.MAIL_USER,
                to: to,
                subject: "Bem vindo ao Ambrosia!",
                text: `${name}, obrigado por ser cadastrar no Ambrosia!`
            });
            return response;
        } catch (error) {
            return error;
        }
    }

}