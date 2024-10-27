
const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const {generateOTP} = require("./otp");
dotenv.config();

let otp = ''

const sendEmail = expressAsyncHandler(async (req, res) => {
  let { email } = req.body;
  const Email = `"`+email+`"`;
  console.log(email);

  otp =generateOTP();
  console.log(otp)

  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    
  });
  

  var mailOptions = {
    from: process.env.SMTP_MAIL,
   //to: "parazulikapil777@gmail.com",
   //to:"anshul2071@gmail.com",
    // to :email,
    to :email.email,
    subject: "OTP form Jodi FInder to confirm ",
    text: `Your OTP  to confirm your id: ${otp}`,
    
  };

  transporter.sendMail(mailOptions, function (error, info) {
  
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully!");
    }
    //console.log(mailOptions);
  }
  );
  res.send(otp);
});


module.exports = { sendEmail};