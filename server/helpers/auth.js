const jwt = require("jsonwebtoken");
const Registration = require("../models/registration");

exports.userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    const userToken = jwt.verify(token, process.env.SECURE);
    const foundUser = await Registration.findOne({
      _id: userToken._id,
      "tokens.token": token,
    });

    req.user = foundUser;
    req.token = token;
    req.userID = foundUser._id;

    next();
  } catch (error) {
    res.send();
  }
};
