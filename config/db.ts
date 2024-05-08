const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB Connected");
  } catch (err: unknown) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export default connectDB;
