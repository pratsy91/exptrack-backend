const Razorpay = require("razorpay");
const Order = require("../models/orders");
const userController = require("./user");

const purchasepremium = async (req, res) => {
  try {
    var rzp = new Razorpay({
      key_id: process.env.RZP_ID,
      key_secret: process.env.RZP_SECRET,
    });
    const amount = 100;

    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Sometghing went wrong", error: err });
      }

      Order.create({ orderid: order.id, status: "PENDING" })
        .then(() => {
          return res.status(201).json({ order, key_id: rzp.key_id });
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "Sometghing went wrong", error: err });
  }
};

const updateTransactionStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("id>>>>", userId);
    const { payment_id, order_id } = req.body;
    const order = await Order.findOne({ orderid: order_id });
    const promise1 = order.updateOne({
      paymentid: payment_id,
      status: "SUCCESSFUL",
    });
    const promise2 = req.user.updateOne({ ispremiumuser: true });

    Promise.all([promise1, promise2])
      .then(() => {
        return res.status(202).json({
          sucess: true,
          message: "Transaction Successful",
          token: userController.generateToken(userId, true),
        });
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (err) {
    console.log(err);
    res.status(403).json({ error: err, message: "Sometghing went wrong" });
  }
};

module.exports = {
  purchasepremium,
  updateTransactionStatus,
};
