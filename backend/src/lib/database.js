const mongoose = require("mongoose");

const initDB = () => {
  const { MONGO_URI } = process.env;

  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  });

  mongoose.connection.once("open", async () => {
    console.log(`connected to database!`);
  });
};

module.exports = initDB;
