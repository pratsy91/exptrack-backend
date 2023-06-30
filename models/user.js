const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    ispremiumuser: { type: Boolean, default: false },
  },
  { timestaps: true }
);

// const Sequelize = require("sequelize");

// const sequelize = require("../database");

// const User = sequelize.define("user", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   name: Sequelize.STRING,
//   email: {
//     type: Sequelize.STRING,
//     unique: true,
//     allowNull: false,
//   },
//   password: Sequelize.STRING,
//   ispremiumuser:Sequelize.BOOLEAN,
// });

const User = mongoose.model("User", UserSchema);

module.exports = User;
