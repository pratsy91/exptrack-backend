const mongoose = require("mongoose");

const ExpenseSchema = mongoose.Schema(
  {
    amount: { type: Number },
    description: { type: String },
    category: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestaps: true }
);

// const Sequelize = require("sequelize");

// const sequelize = require("../database");

// const Expense = sequelize.define("expense", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   amount: Sequelize.INTEGER,
//   description: Sequelize.STRING,
//   category: Sequelize.STRING,
// });

const Expense = mongoose.model("Expense", ExpenseSchema);

module.exports = Expense;
