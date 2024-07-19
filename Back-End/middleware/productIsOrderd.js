const orderItems = require("../models/orderItem");
const Order = require("../models/order");
const { networkInterfaces } = require("os");

const proudctIsBought = async (req, res, next) => {
  const { userId } = req.params;
  const { productId } = req.params;
  let userOrders = await Order.find({ user: userId }).populate(["orderItems"]);

  let data = userOrders.some((el) =>
    el.orderItems.some((el) => el.product.toString() == productId)
  );
  if (data) {
    return next();
  } else {
    return res
      .status(403)
      .json({ message: "You have not bought this prodocut" });
  }
};

module.exports = { proudctIsBought };
