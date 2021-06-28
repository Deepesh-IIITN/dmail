const express = require("express");
const user = express.Router();
const Registration = require("../models/registration");
const sendMail = require("../helpers/email");
const AuthEmail = require("../models/authEmail");
const { GoogleAuth } = require("google-auth-library");
const { OAuth2Client } = require("google-auth-library");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const { userAuth } = require("../helpers/auth");
const allsentmails = require("../models/allsentmails");
user.post("/usersRegistration", async (req, res) => {
  try {
    const { Name, Email, Password, cPassword } = req.body;

    // console.log(Name);

    if (!Name || !Email || !Password || !cPassword) {
      res.status(422).json({ error: "All field required" });
    } else {
      const findUser = await Registration.findOne({ email: Email });

      if (!findUser) {
        if (Name.trim().match(/^([a-zA-Z ]){2,20}$/)) {
          if (
            Email.trim().match(
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
            )
          ) {
            if (
              Password.trim().match(
                /(?=.*?[a-z])(?=.*?[#?!@$%^&*-])(?=.*?[0-9]).{8,}$/
              )
            ) {
              if (Password === cPassword) {
                const verifyEmil = await sendMail(Email, Name);

                if (verifyEmil) {
                  const userData = await Registration({
                    name: Name,
                    email: Email,
                    password: Password,
                    cPassword: cPassword,
                    auth: 0,
                  });

                  await userData.save();

                  res.status(201).json({
                    message: `registration successful and Mail send to this ${Email} Please verify Email`,
                  });
                }
              } else {
                res
                  .status(422)
                  .json({ error: "Password and CPassword are not match" });
              }
            } else {
              res.status(422).json({ error: "Password not Strong" });
            }
          } else {
            res.status(422).json({ error: "Email is not correct" });
          }
        } else {
          res
            .status(422)
            .json({ error: "Name Length should be 4 to 20 and [a-zA-Z]" });
        }
      } else {
        res.status(422).json({ error: "User already registered" });
      }
    }
  } catch (err) {
    console.log(err);
    res.send();
  }
});

user.post("/verifyEmailUser", async (req, res) => {
  try {
    const { code, email } = req.body;

    const get = await Registration.findOne({ email: email });

    if (get.auth == 1) {
      res.status(201).json({ message: "email is ALready Verified" });
    } else {
      const checkCode = await AuthEmail.findOne({ code: code });
      const verify = await Registration.findOneAndUpdate(
        { email: checkCode.email },
        {
          auth: 1,
        }
      );

      if (verify) {
        await AuthEmail.deleteOne({ _id: checkCode._id });

        res
          .status(201)
          .json({ message: "email successfully verified Please login" });
      }
    }
  } catch (err) {
    console.log(err);
    res.send();
  }
});

//login width google email
// ============================================

user.post("/googleApiLogin", async (req, res) => {
  try {
    const { tokenId } = req.body;

    const client = new OAuth2Client(process.env.GOOGLE_ID);

    const verifyToken = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_ID,
    });

    const { email_verified, name, email } = verifyToken.payload;

    if (email_verified) {
      const findUser = await Registration.findOne({ email: email, auth: 1 });

      if (!findUser) {
        const password = uuidv4();

        const userData = await Registration({
          name: name,
          email: email,
          password: password,
          cPassword: password,
          auth: 1,
        });

        const genToken = await userData.jwtGenerateToken();

        res.cookie("jwt", genToken, {
          expires: new Date(Date.now() + 8 * 3600000),
          httpOnly: true,
        });

        await userData.save();

        res.status(201).json({ message: "login" });
      } else {
        const genToken = await findUser.jwtGenerateToken();

        res.cookie("jwt", genToken, {
          expires: new Date(Date.now() + 8 * 3600000),
          httpOnly: true,
        });

        res.status(201).json({ message: "login" });
      }
    } else {
      res.status(422).json({ error: "Invalid Credential Details" });
    }
  } catch (err) {
    res.send();
  }
});

user.post("/usersLogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await Registration.findOne({ email: email, auth: 1 });

    if (findUser) {
      const passCom = await bcrypt.compare(password, findUser.password);

      if (passCom) {
        const genToken = await findUser.jwtGenerateToken();

        res.cookie("jwt", genToken, {
          expires: new Date(Date.now() + 8 * 3600000),
          httpOnly: true,
        });

        await findUser.save();

        res.status(201).json({ message: "Login successfully" });
      } else {
        res.status(422).json({ error: "Invalid Credential Password" });
      }
    } else {
      res.status(422).json({ error: "Invalid Credential Details" });
    }
  } catch (err) {
    // console.log(err);
    res.send();
  }
});

user.get("/logoutUserData", userAuth, async (req, res) => {
  try {
    if (req.user) {
      req.user.tokens = [];
      await req.user.save();
      res.clearCookie("jwt");
    }
    res.status(201).send("logout");
  } catch (err) {
    res.send();
  }
});

user.get("/checkUser", userAuth, async (req, res) => {
  try {
    const Data = req.user;
    const findUser = await Registration.findOne({ email: Data.email, auth: 1 });

    if (findUser) {
      res.status(201).json(req.user);
    }
  } catch (err) {
    res.status(404).send();
  }
});
///sendmail
user.post("/sendMail", userAuth, async (req, res) => {
  try {
    const { name, mail, subject, body, schedule, user_mail } = req.body;
    console.log(req.body);
    const verifyUser1 = await Registration.findOne({
      email: user_mail,
      auth: 1,
    });
    const verifyUser = await Registration.findOne({ email: mail, auth: 1 });

    if (verifyUser1 && verifyUser) {
      var to_name = verifyUser.name;

      await verifyUser1.sendEmailData(to_name, mail, subject, body, schedule);

      // console.log(verifyUser);
      await verifyUser.sendEmailData1(name, user_mail, subject, body);

      // const newtable = await allsentmails([ ,{
      //   from: name,
      //   from_email: user_mail,
      //   to: to_name,
      //   to_email: mail,
      //   subject: subject,
      //   body: body,
      //   schedule: schedule,
      // }]);
      // console.log(newtable);
      // await newtable.save();

      res.status(201).json({ message: "Mail sent " });
    } else {
      res.status(422).json({ error: "Invalid recipient mail id" });
    }
  } catch (err) {
    res.send();
  }
});

module.exports = user;
