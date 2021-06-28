const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("./DB/conn");

const PORT = process.env.PORT || 5000;

const Registration = require("./models/registration");

app.use(express.json());
app.use(cookieParser());

// express Routers
app.use(require("./router/user"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const func = async () => {
  const data = await Registration.find();

  data.map((x) => {
    x.sentmails.map(async (y) => {
      if (y.schedule == "1") {
        const temp = await Registration.findOne({ email: y.email });
        await temp.sendAgain(x.name, x.email, y.subject, y.body);
      }
    });
  });

  setTimeout(() => {
    func();
  }, 25000);
};

setTimeout(() => {
  func();
}, 25000);
