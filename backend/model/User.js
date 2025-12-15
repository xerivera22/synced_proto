/**
 * Example User Model - Demonstrates MongoDB Schema with Mongoose
 * This model can be used as a template for creating other models
 */

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    // Basic Information
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't return password in queries by default
    },
    
    // Role-based access
    role: {
      type: String,
      enum: ['admin', 'student', 'teacher', 'parent'],
      default: 'student',
    },
    
    // Profile Information
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    
    // Account Status
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    
    // Metadata
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    toJSON: { virtuals: true }, // Include virtual properties in JSON
    toObject: { virtuals: true },
  }
);

// =============================================================================
// VIRTUAL PROPERTIES
// =============================================================================

// Full name virtual property
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// =============================================================================
// INDEXES
// =============================================================================

// Create index on email for faster lookups
userSchema.index({ email: 1 });

// Compound index for role and active status
userSchema.index({ role: 1, isActive: 1 });

// =============================================================================
// MIDDLEWARE (HOOKS)
// =============================================================================

// Hash password before saving
userSchema.pre('save', async function (next) {
  // Only hash password if it's modified
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// =============================================================================
// INSTANCE METHODS
// =============================================================================

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

// Update last login
userSchema.methods.updateLastLogin = async function () {
  this.lastLogin = new Date();
  return await this.save();
};

// =============================================================================
// STATIC METHODS
// =============================================================================

// Find user by email
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Find active users by role
userSchema.statics.findActiveByRole = function (role) {
  return this.find({ role, isActive: true });
};

// =============================================================================
// MODEL EXPORT
// =============================================================================

const User = mongoose.model('User', userSchema);

export default User;
