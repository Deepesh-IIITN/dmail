const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const AuthEmail = require("../models/authEmail");
const { v4: uuidv4 } = require("uuid");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(Email, Name) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "deepeshkurmi76@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const code = uuidv4();

    const mailOptions = {
      from: "dmail.com <deepeshkurmi76@gmail.com>",
      to: `${Email}`,
      subject: "Please activate your account",
      text: "Please activate your account",
      html: `<div>
                <p>Hello ${Name}</p>
                <p>Welcome to Sdmt !</p>
                <p>To activate your account please click the button below to verify your email address:</p>
                <a 
                    href="https://d-mail.herokuapp.com/verify_email?code=${code}&email=${Email}" 
                    target="_blank" 
                    style="color:green;"
                ><button>active account</button></a>
            </div>`,
    };

    const result = await transport.sendMail(mailOptions);

    const createAuth = await AuthEmail({
      email: Email,
      code: code,
    });

    await createAuth.save();

    return result;
  } catch (error) {
    return error;
  }
}

module.exports = sendMail;
