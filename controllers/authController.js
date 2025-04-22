const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Unauthorized access!");
    }
    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      return res.status(401).send("Password does not match!");
    }
    let token = jwt.sign(
      { _id: user._id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60,
      secure: process.env.NODE_ENV === "production",
    });

    return res.send("Login success");
  } catch (error) {}
};

module.exports = {
  login,
};
