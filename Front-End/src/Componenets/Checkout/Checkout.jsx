import React, { useEffect, useState } from "react";
import { request } from "../../axios/axios";
import LoadingButton from "../../ui/LoadingButton";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
const stripeKey = loadStripe(
  "pk_test_51PQzYsAeDMk9ovRarR1ATuRFcrMIWG5f8jBDmAcGN3XyTVhp3nMGJ6cLJgZcicokdrOrXqMv3z7NyhSxnhzmkEds00VPQ2KPTE"
);
export default function Checkout() {
  const [informCheckout, setInformCheckout] = useState({
    shippingAddress1: "",
    phone: "",
    city: "",
    country: "",
  });
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart")).map(
    (product) => ({
      product: product._id,
      quantity: product.quantity,
    })
  );
  const [Loading, setLoading] = useState(false);
  async function handleCheckout() {
    if (
      informCheckout.shippingAddress1 === "" ||
      informCheckout.phone === "" ||
      informCheckout.city === "" ||
      informCheckout.country === ""
    )
      return toast.warn("you Must Add All Inform");
    setLoading(true);
    const result = await request.post(
      "/orders/create-checkout-session",
      cartFromLocalStorage,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    const stripePromise = await stripeKey;
    const { error } = await stripePromise.redirectToCheckout({
      sessionId: result?.data?.id,
    });
    if (error) {
      console.error("error redirecting to stripe checkout:", error);
    }

    setLoading(false);
  }
  useEffect(() => {
    if (localStorage.getItem("informCheckout")) {
      setInformCheckout(JSON.parse(localStorage.getItem("informCheckout")));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("informCheckout", JSON.stringify(informCheckout));
  }, [informCheckout]);
  function handleChange(e) {
    setInformCheckout((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  return (
    <section className="py-5 mx-auto p-3 marginTop">
      <h2 className="mb-3 text-main p-3 fw-bolder">Billing Details</h2>
      <form>
        <div className="form-group p-2">
          <label className="p-2" htmlFor="details">
            shippingAddress<span className=" text-danger">*</span>
          </label>
          <input
            type="text"
            className=" form-control"
            name="shippingAddress1"
            id="shippingAddress1"
            placeholder="shippingAddress"
            value={informCheckout.shippingAddress1 || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group p-2">
          <label className="p-2" htmlFor="phone">
            Phone<span className=" text-danger">*</span>
          </label>
          <input
            type="text"
            className=" form-control"
            name="phone"
            id="phone"
            placeholder="Phone"
            value={informCheckout.phone || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group p-2">
          <label className="p-2" htmlFor="details">
            city<span className=" text-danger">*</span>
          </label>
          <input
            type="text"
            className=" form-control"
            name="city"
            id="city"
            placeholder="City"
            onChange={handleChange}
            value={informCheckout.city || ""}
          />
        </div>
        <div className="form-group p-2">
          <label className="p-2" htmlFor="details">
            country<span className=" text-danger">*</span>
          </label>
          <input
            type="text"
            className=" form-control"
            name="country"
            id="country"
            placeholder="country"
            value={informCheckout.country || ""}
            onChange={handleChange}
          />
        </div>
      </form>
      <button
        className="w-full flex justify-center items-center font-semibold bg-main  p-2 rounded-md mt-4 text-white"
        onClick={handleCheckout}
      >
        {Loading ? <LoadingButton /> : "checkout"}
      </button>
    </section>
  );
}
