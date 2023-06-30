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

const Expense = mongoose.model("Expense", ExpenseSchema);

module.exports = Expense;
