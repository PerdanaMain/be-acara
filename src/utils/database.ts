import mongoose from "mongoose";
import { DATABASE_URL } from "./env";

const connect = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      dbName: "wpu-be-acara",
    });
    console.log("Database connected successfully");
    return Promise.resolve("Database connected successfully");
  } catch (error) {
    return Promise.reject(
      `Database connection failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

export default connect;
