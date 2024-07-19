import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../axios/axios";
import { useShoppingCart } from "../context/ShoppingCartContext";

export default function Success() {
  const user = JSON.parse(localStorage.getItem("user"));
  const informCheckout = JSON.parse(localStorage.getItem("informCheckout"));
  const [success, setSuccess] = useState(false);
  const { removeAllCart } = useShoppingCart();
  let cartFromLocalStorage;

  if (localStorage.cart && localStorage.cart?.length > 0) {
    cartFromLocalStorage = JSON.parse(localStorage.getItem("cart")).map(
      (product) => ({
        product: product._id,
        quantity: product.quantity,
      })
    );
  }
  const navigate = useNavigate();
  useEffect(() => {
    async function createOrder() {
      const result = await request.post("/orders", {
        orderItems: cartFromLocalStorage,
        shippingAddress1: informCheckout?.shippingAddress1,
        phone: informCheckout?.phone,
        city: informCheckout?.city,
        country: informCheckout?.country,
        user: user?._id,
      }, {
        headers: {
          Authorization:localStorage.getItem('token')
        }
      });
      if (result?.data?._id) {
        setSuccess(true);
      removeAllCart();
        localStorage.removeItem("cart");
        localStorage.removeItem("informCheckout");
      }
      console.log(result);
    }
    if (informCheckout) {
      createOrder();
    }
  }, [cartFromLocalStorage, informCheckout, removeAllCart, user?._id]);
  if (success)
    return (
      <div className="w-full flex items-center flex-col gap-3 justify-center -translate-y-12 min-h-[70vh]">
        <h1 className="mt-28 font-semibold text-red-500">Thank You</h1>
        <button
          className="py-1 px-2 rounded-md bg-red-300  w-fit transition-all duration-150 hover:bg-red-400 text-white"
          onClick={() => navigate("/orders")}
        >
          See Your Order
        </button>
      </div>
    );
}
