const Expense = require("../models/expense");
const User = require("../models/user");

const getUserLeaderBoard = async (req, res, next) => {
  try {
    const users = await User.find();
    const expenses = await Expense.find();

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

    return res.status(201).json(total);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getUserLeaderBoard,
};
