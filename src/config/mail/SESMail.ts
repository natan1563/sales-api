import nodemailer from "nodemailer";
import aws from 'aws-sdk'
import mailConfig from '@config/mail/mail'
import HandlebarsMailTemplate from "./HandlebarsMailTemplate";

interface ITemplateVariables {
  [key: string]: string | number
}

interface IParseMailTemplate {
  file: string;
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


export default class SESMail {
  public static async sendMail({ to, from, subject, templateData }: ISendMail ): Promise<void> {
    const transporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01'
      })
    });

    const { email, name } = mailConfig.defaults.from;
    const mailTemplate = new HandlebarsMailTemplate();
    const message = await transporter.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parser(templateData)
    })
  }
}
