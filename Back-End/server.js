const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const uersRoutes = require("./Routes/uersRoutes");
const CategoryRoutes = require("./Routes/categoryRoute");
const ProductsRoutes = require("./Routes/productsRoute");
const RatingAndReviews = require("./Routes/ratingAndReviews");
const wishList = require("./Routes/wishList");
const orders = require("./Routes/orders");
const chat = require("./Routes/chat");
const cors = require("cors");
const AppError = require("./utils/AppError");
const globalErrorHandeler = require("./contolers/errorr");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use("/orders", orders);
app.use("/users", uersRoutes);
app.use("/categories", CategoryRoutes);
app.use("/products", ProductsRoutes);
app.use("/wishList", wishList);
app.use("/ratingsAndReviews", RatingAndReviews);
app.use("/chat", chat);
//catching unhandele routes
app.all("*", (req, res, next) => {
  next(new AppError(`cant find ${req.originalUrl}`, 404));
});
//global erro handiling function
app.use(globalErrorHandeler);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected db"))
  .catch((error) => console.log(error));
app.listen(5000, (_) => {
  console.log("listing on port 5000");
});
