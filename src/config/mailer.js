import nodemailer from 'nodemailer'
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.USER_MAILER,
      pass: process.env.PASSWORD_MAILER
    },
  });