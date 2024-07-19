const orderItems = require("../models/orderItem");
const Products = require("../models/prducts");

const proudctIsBought = async (userOrders, productId) => {
  let aLLOrderItems = await Promise.all(
    userOrders.map(async (order) => {
      foudnOrder = await Products.findOne({ product: productId });
      if (foudnOrder) {
        found = true;
        return found;
      } else {
        return "the order was not found";
      }
    })
  );
  return found;
};
module.exports = { proudctIsBought };
