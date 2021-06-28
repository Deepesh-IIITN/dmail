const mongoose = require("mongoose");
const DB = process.env.DB;
//connection of db
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
