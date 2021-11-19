const nodemailer = require("nodemailer");
 // create reusable transporter object using the default SMTP transport
 export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'mario.diaz.quiroga.91@gmail.com', // generated ethereal user
      pass: 'unfxshcfpizlshho', // generated ethereal password
    },
  });
  transporter.verify().then(()=>{
      console.log('Listo para enviar emails');
  })