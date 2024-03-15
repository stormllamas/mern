const moongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await moongoose.connect(db, {
      useNewUrlParser: true,
      // useCreateIndex: true,
    });
    console.log("MongoDB Connected");
  } catch (err: unknown) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
