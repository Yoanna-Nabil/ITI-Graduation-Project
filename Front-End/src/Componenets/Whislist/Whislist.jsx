import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import empty from "../../Assets/dribble_shot_62_4x.jpg";
import whislist from "../../Assets/whislist.png";
import ProductItem from "../ProductItem/ProductItem";

export default function Whislist() {
  const [hoverProduct, setHoverProduct] = useState(null);
  const favoriteProducts = useSelector(
    (state) => state.favoriteproducts.products
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (!favoriteProducts?.length)
    return (
      <div className="flex justify-center items-center w-full h-full">
        <img src={empty} className="max-w-lg" alt="emty" />
      </div>
    );
  const handleMouseOver = (productId) => {
    setHoverProduct(productId);
  };

  const handleMouseOut = () => {
    setHoverProduct(null);
  };

  return (
    <div className=" w-[95%] mx-auto my-16">
      <h4 className="my-3 font-bold text-red-500">Your WishList</h4>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(0,_250px))] smml:grid-cols-[repeat(auto-fit,_minmax(250px,1fr))]  gap-5">
        {favoriteProducts && favoriteProducts?.length > 0 ? (
          favoriteProducts?.map((product) => (
            // <div
            //   className={` mb-4 ${style.parent}`}
            //   key={product._id}
            //   style={{ marginLeft: "10px" }}
            // >
            //   <div className="card no-border">
            //     <img
            //       src={`${url}/img/${product.image}`}
            //       className=""
            //       alt={product.name}
            //     />
            //     <h3 className="card-title">{product?.name}</h3>
            //     <h4 className="card-title">{product?.price}</h4>
            //   </div>
            //   <button
            //     className={`btn btn-light ${style.button} `}
            //     onClick={() => handleRemove(product?._id)}
            //   >
            //     <i className="fa-regular fa-trash-can"></i>
            //   </button>
            // </div>
            <ProductItem
              key={product._id}
              product={product}
              hoverProduct={hoverProduct}
              handleMouseOver={handleMouseOver}
              handleMouseOut={handleMouseOut}
              offer={product?.offres === true ? true : false}
            />
          ))
        ) : (
          <img src={whislist} className="w-100" alt="whislist" />
        )}
      </div>
    </div>
  );
}
