const mongoose = require("mongoose");

const allsentmailSchema = new mongoose.Schema({
  sentmails: [
    {
      from: {
        type: String,
        required: true,
      },
      from_email: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
      to_email: {
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
});

const allsentmails = new mongoose.model("allsentmails", allsentmailSchema);

module.exports = allsentmails;
