const Order = require("../models/order.js");
const cactchAsync = require("../utils/catechAsync");
const OrderItem = require("../models/orderItem");
const Products = require("../models/prducts.js");
const stripe = require("stripe")(process.env.STRIPE_SECET_KEY);
const getAllOrdersItesm = cactchAsync(async (req, res, next) => {
  const all = await OrderItem.find().populate("product");
  res.status(200).json({ data: all });
});
const getAllOrders = cactchAsync(async (req, res, next) => {
  const orderList = await Order.find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 });

  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

const getOrderById = cactchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        populate: "categoryId",
      },
    });

  if (!order) {
    return next(
      new AppError(
        " no orders   found it may be invalid order id  or the order   has been deleted",
        404
      )
    );
  }
  res.send(order);
});
const getOrderByIdUser = cactchAsync(async (req, res) => {
  const { id } = req.params;
  const findOrder = await Order.find({ user: id });
  if (!findOrder) {
    return next(
      new AppError(
        " no orders   found it may be invalid order id  or the order   has been deleted",
        404
      )
    );
  }
  return res.status(200).json({ message: "success", data: findOrder });
});
const createAnOrder = cactchAsync(async (req, res) => {
  const orderItemsIds = Promise.all(
    req.body.orderItems.map(async (orderitem) => {
      let newOrderItem = new OrderItem({
        quantity: orderitem.quantity,
        product: orderitem.product,
      });
      let orderOuaintity = await Promise.all(
        req.body.orderItems.map(async (prd) => {
          let product = await Products.findById(prd.product);
          if (prd.quantity > product.Quantity) {
            res.json({
              message: `sorry but we dont have this amount of ${product.name}`,
            });
          } else {
            //adjucet quantity
            product.Quantity -= prd.quantity;
            product.sold += +prd.quantity;

            await Products.findOneAndUpdate(
              { _id: prd.product },
              { Quantity: product.Quantity, sold: product.sold }
            );
          }
        })
      );
      newOrderItem = await newOrderItem.save();

      return newOrderItem._id;
    })
  );

  const orderItemsIdsResolved = await orderItemsIds;

  const totalPrices = await Promise.all(
    orderItemsIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        "product"
      );
      const totalPrice = orderItem.product.price * orderItem.quantity;

      return totalPrice;
    })
  );

  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

  let order = new Order({
    orderItems: orderItemsIdsResolved,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: totalPrice,
    user: req.body.user,
  });
  order = await order.save();

  if (!order) {
    return next(
      new AppError(
        " no orders   found it may be invalid order id  or the order   has been deleted",
        404
      )
    );
  }
  res.status(200).send(order);
});

const checkoutSession = cactchAsync(async (req, res) => {
  const orderItems = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: "There are no orders" });
  }
  const lineItems = await Promise.all(
    orderItems.map(async (orderItem) => {
      const product = await Products.findById(orderItem.product);
      return {
        price: "price_1PRcMWAeDMk9ovRaeGyVKIO3",
        quantity: orderItem.quantity,
      };
    })
  );
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:4200/erorr",
  });
  res.json({ id: session.id });
});
const updateOrderStatus = cactchAsync(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  );

  if (!order) return res.status(400).send("the order cannot be update!");

  res.send(order);
});
module.exports = {
  getAllOrdersItesm,
  getAllOrders,
  getOrderById,
  createAnOrder,
  checkoutSession,
  updateOrderStatus,
  getOrderByIdUser,
};
