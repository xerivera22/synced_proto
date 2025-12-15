/* eslint-env node */
import dotenv from "dotenv";
import mongoose from "mongoose";
import Admin from "../model/admin.js";

// Load environment variables
dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected\n");

    // Admin credentials
    const adminData = {
      name: "School Admin",
      email: "schooladmin123@gmail.com",
      password: "synced_admin",
      role: "admin",
    };

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminData.email });

    if (existingAdmin) {
      console.log("⚠️  Admin already exists with this email:");
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Name: ${existingAdmin.name}`);
      console.log(`   Role: ${existingAdmin.role}`);
      console.log("\n💡 If you need to reset the password, delete this admin first.");
      process.exit(0);
    }

    // Create admin (password will be automatically hashed by pre-save hook)
    console.log("👤 Creating admin user...");
    const admin = await Admin.create(adminData);

    console.log("\n✅ Admin created successfully!");
    console.log("=".repeat(60));
    console.log("📋 Admin Credentials:");
    console.log("=".repeat(60));
    console.log(`Name:     ${admin.name}`);
    console.log(`Email:    ${admin.email}`);
    console.log(`Password: ${adminData.password}`);
    console.log(`Role:     ${admin.role}`);
    console.log("=".repeat(60));
    console.log("\n🔐 Password has been securely hashed in the database");
    console.log("🚀 You can now login to the admin dashboard\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
    process.exit(1);
  }
};

// Run the seed function
seedAdmin();
