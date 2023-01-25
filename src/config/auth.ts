export default {
  jwt: {
    secret: process.env.APP_SECRET,
    salt: process.env.APP_CRIPT_SALT || 8,
    expiresIn: '1d'
  },
  ethereal: {
    user: process.env.APP_MAIL_USER,
    pass: process.env.APP_MAIL_PASSWORD,
  }
}
