import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import { request } from "../../axios/axios";
import { setWishList } from "../../slice/slice";
import { useDispatch } from "react-redux";
import { useShoppingCart } from "../context/ShoppingCartContext";

export default function Layout() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  ///////////get All WishList//////////
  const { checkLogin } = useShoppingCart();
  //////////////
  ////////////
  useEffect(() => {
    async function getAllWishList() {
      const result = await request.get( `/wishList/${user?._id}`, {
        headers: {
          Authorization:localStorage.getItem('token')
        }
      } );
      console.log(result)
      dispatch(setWishList(result?.data?.data?.products));
    }
    if (localStorage.getItem("token")) {
      getAllWishList();
    }
  }, [dispatch, user?._id, checkLogin]);

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(67vh)]">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
