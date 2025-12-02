import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Updated connection options: deprecated flags removed
    await mongoose.connect("mongodb://127.0.0.1:27017/synced");
    console.log("MongoDB connected to synced database");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    // Do not exit the process here so the server can run in environments
    // where MongoDB isn't available (local dev without DB). This allows
    // the Express app to start and serve mock/readonly routes.
    // If you want the server to stop on DB errors, keep the original
    // `process.exit(1)` behavior or set an env flag to control it.
  }
};

export default connectDB;
