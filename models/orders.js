const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    paymentid: { type: String },
    orderid: { type: String },
    status: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestaps: true }
);

// const Sequelize = require('sequelize');
// const sequelize = require('../database');

// const Order = sequelize.define('order', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     paymentid: Sequelize.STRING,
//     orderid: Sequelize.STRING,
//     status: Sequelize.STRING
// })

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
