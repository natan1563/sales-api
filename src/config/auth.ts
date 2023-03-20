export default {
  jwt: {
    secret: process.env.APP_SECRET || 'f1e915ff831db06cf3fcb895fca51f63',
    salt: process.env.APP_CRIPT_SALT || 8,
    expiresIn: '1d'
  },
  ethereal: {
    user: process.env.APP_MAIL_USER,
    pass: process.env.APP_MAIL_PASSWORD,
  }
}
