const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "7f633c001@smtp-brevo.com",
    pass: "SZPGR7qUc4bmC3sr",
  },
});


const SendMail =  async(toemail,subject,message) => {
    
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"Spotify "depk1318@gmail.com', // sender address
        to: toemail, // list of receivers
        subject, // Subject line
        html:message, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
    
}

module.exports = SendMail;