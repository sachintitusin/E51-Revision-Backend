const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Regex: at least one lowercase, one uppercase, one number, one special character
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value);
      },
      message:
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
    },
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'seller'],
    default: 'user'
  }
});

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
