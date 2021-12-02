import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from "nodemailer";
export class MailtrapMailProvider implements IMailProvider {
    private transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "586e2e5fb16874",
                pass: "85560432fff9b1"
            }
        });
    }
    async sendMail(message: IMessage): Promise<void> {
        this.transporter.sendMail({
            to: {
                name: message.to.email,
                address: message.to.email,
            },
            from: {
                name: message.from.email,
                address: message.from.email,
            },
            subject: message.subject,
            html: message.body
        })
    }

}