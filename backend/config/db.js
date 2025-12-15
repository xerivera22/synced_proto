import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    // Get MongoDB URI from environment variables
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
      throw new Error(
        "MONGO_URI is not defined in environment variables. Please check your .env file."
      );
    }

    // Connect to MongoDB Atlas
    const conn = await mongoose.connect(mongoURI, {
      dbName: "synced_db", // Explicitly set database name
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);

    // Handle connection events
    mongoose.connection.on("disconnected", () => {
      console.log("⚠️  MongoDB disconnected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    
    // In production, exit on database connection failure
    if (process.env.NODE_ENV === "production") {
      console.error("🚨 Exiting process due to database connection failure in production");
      process.exit(1);
    } else {
      console.log("⚠️  Running in development mode without database connection");
    }
  }
};

export default connectDB;
