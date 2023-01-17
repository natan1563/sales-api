import nodemailer from "nodemailer";
import authConfig from '../auth';
import HandlebarsMailTemplate from "./HandlebarsMailTemplate";

interface ITemplateVariables {
  [key: string]: string | number
}

interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariables;
}

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  from?: IMailContact;
  to: IMailContact;
  templateData: IParseMailTemplate;
  subject: string;
}


export default class Etherealmail {
  public static async sendMail({ to, from, subject, templateData }: ISendMail ): Promise<void> {
    const account = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        ...authConfig.ethereal,
      },
    });

    const mailTemplate = new HandlebarsMailTemplate();

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe API Vendas',
        address: from?.email || 'equipe@apivendas.com'
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parser(templateData)
    })

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
