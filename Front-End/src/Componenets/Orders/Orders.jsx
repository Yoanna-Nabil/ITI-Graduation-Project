import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../../axios/axios";
import notOrder from "../../Assets/no-order.jpg";
export default function Orders() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();
  const getOrders = useCallback(async () => {
    await request.get(`/orders/user/${user._id}`).then((result) => {
      setOrder(result?.data?.data);
    });
  }, [user._id]);
  console.log(order);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getOrders();
    }
  }, [getOrders]);
  if (order && order?.length === 0) {
    return (
      <div className="w-full flex items-center flex-col gap-3 justify-center -translate-y-12 min-h-[70vh]">
        <img src={notOrder} alt="noOrder" />
      </div>
    );
  }
  return (
    <div className="w-[95%] mx-auto">
      <h2 className=" text-danger rounded-4 py-3 fw-bolder text-capitalize mb-4">
        my orders
      </h2>

      <div className="orders bg-light bg-opacity-25 shadow w-100 p-2 rounded-2 mt-3 mb-3">
        <div className="d-flex justify-content-around fw-bolder align-items-center">
          <p>CreatedAt</p>
          <p className="-ml-4">totalPrice</p>
          <p>Details</p>

          <p>status</p>
        </div>
      </div>
      {order &&
        order
          ?.filter((e) => e?.totalPrice !== 0)
          ?.slice()
          .reverse()
          .map((item, i) => (
            <div className="row" key={i}>
              <div className="col-md-12 bg-light bg-opacity-25 shadow w-100 rounded-2 mt-3 mb-3">
                <div className="order d-flex justify-content-around fw-bolder align-items-center">
                  <p className="">{item?.dateOrdered?.slice(0, 10)}</p>
                  <p className="">{item?.totalPrice}</p>
                  <p
                    className="ml-8 cursor-pointer"
                    onClick={() => navigate(`/order/${item?._id}`)}
                  >
                    Details
                  </p>

                  <p className="">{item?.status}</p>
                </div>
              </div>
            </div>
          ))}

      <Link to={"/"}>
        <button className=" btn  border-2 border-black m-3 text-black">
          Return to Shop
        </button>
      </Link>
    </div>
  );
}
