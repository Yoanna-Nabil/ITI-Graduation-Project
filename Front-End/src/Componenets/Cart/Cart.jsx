import React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Button } from "react-bootstrap";
import empty from "../../Assets/emptyCart.png";
import { url } from "../../axios/axios";
import formatCurrency from "../formatcurrency";
import { useNavigate } from "react-router-dom";
import style from "../Home/Home.module.css";

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    getTotalPrice,
  } = useShoppingCart();
  const navigate = useNavigate()
  if (cartItems.length === 0)
    return (
      <div className="flex justify-center items-center w-full h-full mt-5">
        <img src={empty} className="max-w-lg" alt="emty" />
      </div>
    );
  return (
    <div className="w-[95%] mx-auto min-h-[70vh]">
      <>
        <div className={`${style.bestSellingProductsContainer} mt-5`}>
          <i class="fa-solid fa-cart-arrow-down text-red-600 fa-2x "></i>
          <h3 className="fw-bold">Your Shopping Cart</h3>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,_minmax(0,_250px))] smml:grid-cols-[repeat(auto-fit,_minmax(250px,1fr))]  gap-4">
          {cartItems.map((item) => (
            <div key={item._id} className="card">
              <img
                src={`${url}/img/${item?.image}`}
                className="card-img-top object-cover h-48 w-full"
                alt={item.name}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {item.name.split(" ").slice(0, 3).join(" ")}
                </h5>
                <p>{formatCurrency(item.price)}</p>
                <div className="d-flex align-items-center justify-content-between">
                  <Button
                    onClick={() => decreaseQuantity(item)}
                    size="sm"
                    variant="secondary"
                    className="me-3 w-75"
                  >
                    -
                  </Button>
                  <span className="fs-6 fw-bold">{item.quantity} </span>
                  <Button
                    onClick={() => increaseQuantity(item)}
                    size="sm"
                    variant="secondary"
                    className="ms-3 w-75"
                  >
                    +
                  </Button>
                </div>
                <Button
                  onClick={() => removeItem(item)}
                  variant="danger"
                  className="mt-2 w-100"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
        <p className="w-full mt-3 mb-2 font-semibold text-center bg-gray-300 p-1 rounded-md">
          Total Price : {formatCurrency(getTotalPrice())}
        </p>
        <button
          className="w-full  text-center font-semibold bg-gray-300 p-1 rounded-md hover:bg-gray-400 transition-all duration-150"
          onClick={() => navigate("/checkout")}
        >
          place-order
        </button>
      </>
    </div>
  );
};

export default Cart;
