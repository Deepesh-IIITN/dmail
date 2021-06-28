const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cPassword: {
    type: String,
    required: true,
  },
  auth: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  sentmails: [
    {
      to: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
      time: {
        type: Date,
        default: Date.now,
        required: true,
      },
      schedule: {
        type: String,
        required: true,
      },
    },
  ],
  receivedmails: [
    {
      from: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
      time: {
        type: Date,
        default: Date.now,
        required: true,
      },
    },
  ],
});

registrationSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cPassword = await bcrypt.hash(this.cPassword, 12);
  }
  next();
});

registrationSchema.methods.jwtGenerateToken = async function () {
  try {
    const tokenJwt = jwt.sign({ _id: this._id }, process.env.SECURE);
    this.tokens = this.tokens.concat({ token: tokenJwt });
    await this.save();
    return tokenJwt;
  } catch (error) {}
};

registrationSchema.methods.sendEmailData = async function (
  to_name,
  mail,
  subject,
  body,
  schedule
) {
  try {
    this.sentmails = this.sentmails.concat({
      to: to_name,
      email: mail,
      subject: subject,
      body: body,
      schedule: schedule,
    });

    const temp = await this.save();
  } catch (error) {}
};
//////////////////////////////
registrationSchema.methods.sendEmailData1 = async function (
  name,
  user_mail,
  subject,
  body
) {
  try {
    this.receivedmails = this.receivedmails.concat({
      from: name,
      email: user_mail,
      subject: subject,
      body: body,
    });

    await this.save();
  } catch (error) {}
};

///////////////////////////////////

registrationSchema.methods.sendAgain = async function (
  name,
  email,
  subject,
  body
) {
  try {
    this.receivedmails = this.receivedmails.concat({
      from: name,
      email: email,
      subject: subject,
      body: body,
    });

    await this.save();
  } catch (error) {}
};

const Registration = new mongoose.model("Registration", registrationSchema);

module.exports = Registration;
