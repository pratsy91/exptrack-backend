const Expense = require("../models/expense");
const User = require("../models/user");
// const sequelize = require("../database");

const getUserLeaderBoard = async (req, res, next) => {
  try {
    const users = await User.find();
    const expenses = await Expense.find();
    // const totalExpenses = {};

    const total = await Expense.aggregate([
      {
        $group: { _id: "$userId", sum: { $sum: "$amount" } },
      },
      { $sort: { sum: -1 } },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
    ]);

    // console.log("total>>>>>>>", total);

    // const user_s = await Expense.aggregate([
    //   {
    //     $lookup: {
    //       from: "users",
    //       localField: "userId",
    //       foreignField: "_id",
    //       as: "user",
    //     },
    //   },
    // ]);

    // console.log("users>>>>>>>>>>>>>>", user_s);

    // expenses.forEach((expense) => {
    //   if (totalExpenses[expense.userId]) {
    //     totalExpenses[expense.userId] += expense.amount;
    //   } else {
    //     totalExpenses[expense.userId] = expense.amount;
    //   }
    // });

    // let leaderBoard = [];
    // users.forEach((user) => {
    //   leaderBoard.push({
    //     name: user.name,
    //     total_amount: totalExpenses[user._id] || 0,
    //   });
    // });
    // leaderBoard.sort((a, b) => b.total_amount - a.total_amount);
    return res.status(201).json(total);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getUserLeaderBoard,
};
