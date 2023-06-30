const express = require("express");
const dotenv = require("dotenv");
var cors = require("cors");
const connectDB = require("./database");
const userRoutes = require("./routes/user");
// const User = require("./models/user");
// const Expense = require("./models/expense");
// const Order = require("./models/orders");


const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchase");
const premiumRoutes = require("./routes/premiumFeatures");
const resetPasswordRoutes = require("./routes/resetpassword");
dotenv.config();
connectDB();
const app = express();
app.use(cors());

app.use(express.json());

app.use("/user", userRoutes);
app.use("/expense", expenseRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/premium", premiumRoutes);


// User.hasMany(Expense);
// Expense.belongsTo(User);

// User.hasMany(Order);
// Order.belongsTo(User);

// User.hasMany(Forgotpassword);
// Forgotpassword.belongsTo(User);

app.listen(5000);

// sequelize
//   .sync()
//   .then(() => {
//     app.listen(5000);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
