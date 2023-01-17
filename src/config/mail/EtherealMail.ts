import nodemailer from "nodemailer";
interface ISendMail {
  to: string;
  body: string;
}

export default class Etherealmail {
  public static async sendMail({ to, body }: ISendMail ): Promise<void> {
    const account = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user:'evert.toy40@ethereal.email',
        pass: 'NYfw6p7Xx7MkaTqsJc',
      },
    });

    const message = await transporter.sendMail({
      from: 'equipe@apivendas.com',
      to,
      subject: 'Recovery of your password',
      text: body
    })

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
