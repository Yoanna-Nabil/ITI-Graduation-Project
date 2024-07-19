import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate, useParams } from "react-router-dom";
import style from "./details.module.css";
import { useDispatch, useSelector } from "react-redux";
import { request, url } from "../../axios/axios";
import Loading from "../../ui/Loading";
import { handleAddWishLish, removeFromWishList } from "../../api/api";
import { setWishList } from "../../slice/slice";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Button } from "react-bootstrap";
import Rating from "../../ui/Rating";
import AddReview from "./AddReview";
import ReviewClients from "./ReviewClients";

import { useQuery } from "react-query";

function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();

  const favoriteProducts = useSelector(
    (state) => state.favoriteproducts.products
  );

  function getSingleProducts(id) {
    return request.get(`/products/single/${id}`);
  }
  const { data, refetch } = useQuery(["getSingleProductsUser", id], () =>
    getSingleProducts(id)
  );
  console.log(data);
  /////////////add wish list///////////
  async function addWishLish(id) {
    const result = await handleAddWishLish(id);
    dispatch(setWishList(result?.data?.data?.products));
  }
  /////////////remove wish list////////
  async function handleRemove() {
    const result = await removeFromWishList(data?.data?.data?._id);
    if (result) {
      dispatch(setWishList(result?.data?.data?.products));
    }
  }
  /////////slider///////
  const settings = {
    dots: false,
    infinite: data?.data?.data[0]?.images.length > 1 ? true : false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1000,
  };
  ////////////////////////
  const { getItemsQuantity, increaseQuantity, decreaseQuantity, removeItem } =
    useShoppingCart();
  const quantity = getItemsQuantity(data?.data?.data[0]?._id);
  //////fgg////////
  const [hoverProduct, setHoverProduct] = useState();
  const handleMouseOver = (productId) => {
    setHoverProduct(productId);
  };

  const handleMouseOut = () => {
    setHoverProduct(null);
  };
  return (
    <div className="mb-16">
      <div className="w-full text-center mt-5 font-bold">
        <h4 className="text-[35px]">Details Product</h4>
      </div>
      {data ? (
        <div
          className={style.parentdiv}
          onMouseOver={() => handleMouseOver(data?.data?.data?._id)}
          onMouseOut={handleMouseOut}
        >
          <div className={`${style.childone} mb-5`}>
            <Slider {...settings}>
              {data?.data?.data?.images?.map((e, i) => (
                <div key={i}>
                  <img
                    src={`${url}/img/${e}`}
                    className="w-100"
                    alt={"detailsprd.name"}
                  />
                  {quantity === 0 ? (
                    <Button
                      onClick={() => {
                        if (localStorage.getItem("token")) {
                          increaseQuantity(data?.data?.data);
                        } else {
                          navigate("/login");
                        }
                      }}
                      className={`btn btn-dark w-100 showbutton ${
                        hoverProduct === data?.data?.data?._id
                          ? "d-block"
                          : "d-none"
                      }`}
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <div
                      className={`w-100 ${
                        hoverProduct === data?.data?.data?._id
                          ? "d-block"
                          : "d-none"
                      }`}
                    >
                      <div className="d-flex align-items-center justify-content-center">
                        <Button
                          onClick={() => increaseQuantity(data?.data?.data)}
                          size="sm"
                        >
                          +
                        </Button>
                        <span>{quantity} in cart</span>
                        <Button
                          onClick={() => decreaseQuantity(data?.data?.data)}
                          size="sm"
                        >
                          -
                        </Button>
                      </div>
                      <Button
                        onClick={() => removeItem(data?.data?.data)}
                        variant="danger"
                        className="mt-2"
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </Slider>
          </div>
          <div className={style.childttwo}>
            <h1>{data?.data?.data?.name}</h1>
            <Rating rating={data?.data?.data?.Rate} size={30} />
            <p>{data?.data?.data?.description}</p>
            <div className="flex justify-between items-center">
              <p>${data?.data?.data?.price}</p>
              {data?.data?.data?.offres && (
                <p className="text-gray-800 text-decoration-line-through">
                  ${data?.data?.data?.priceAfterOffer}
                </p>
              )}
            </div>
            <hr></hr>
            <div className="d-flex justify-content-center  gap-3">
              <button
                className="bg-gray-300 px-2 rounded-lg font-semibold text-sm"
                onClick={() => navigate("/")}
              >
                Back To Home
              </button>
              <button className={`btn-icon ${style.favProduct}`}>
                {favoriteProducts &&
                favoriteProducts.find(
                  (e) => e?._id === data?.data?.data?._id
                ) ? (
                  <i
                    className="fa-solid fa-heart iconwishfavourit  p-2"
                    onClick={handleRemove}
                  ></i>
                ) : (
                  <i
                    className="fa-regular fa-heart iconwish p-2"
                    onClick={() => {
                      if (localStorage.getItem("token")) {
                        addWishLish(data?.data?.data?._id);
                      } else {
                        navigate("/login");
                      }
                    }}
                  ></i>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
      <div className="flex justify-center pl-[40px] pr-[40px]smm:pr-[20px] smm:pl-[20px] smm:flex-col-reverse mt-4 ">
        <div className="w-[80%] p-5 smm:w-[100%] rounded-lg flex flex-col gap-10   border-gray-500 border-solid border-4  ">
          <AddReview id={data?.data?.data?._id} refetch={refetch} />
          <div>
            <ReviewClients detailsprd={data?.data?.data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
