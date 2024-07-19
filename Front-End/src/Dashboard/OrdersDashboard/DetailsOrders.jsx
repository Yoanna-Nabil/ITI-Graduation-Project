import React from "react";
import HeaderTable from "../ComponantDashboard/HeaderTable";
import { useParams } from "react-router-dom";
import { request, url } from "../../axios/axios";
import { useQuery } from "react-query";
export default function DetailsOrders() {
  const { id } = useParams();
  function getSingleOrders(id) {
    return request.get(`/orders/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  }
  const { data} = useQuery(["getSingleOrders", id], () =>
    getSingleOrders(id)
  );
  console.log(data);
  return (
    <div className="w-[95%] mx-auto mt-4 bg-white min-h-96 p-3">
      <div>
        <HeaderTable title={"order Details"} />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(0,_250px))]  gap-5">
        {data &&
          data?.data?.orderItems?.map((order, index) => (
            <div key={index}>
              <div className=" overflow-hidden px-2 py-3 relative">
                <img
                  className="w-100"
                  src={`${url}/img/${order?.product?.image}`}
                  alt="product"
                />
                <h5 className="  mt-3 text-black">
                  name:{" "}
                  <span className="text-gray-500">
                    {" "}
                    {order?.product?.name}
                  </span>
                </h5>
                <div className=" mb-3">
                  <div className="flex flex-col text-black">
                    <p>
                      price:{" "}
                      <span className="text-gray-500">
                        {order?.product?.price}
                      </span>
                    </p>
                    <p className="-mt-4 text-black">
                      Quantity:{" "}
                      <span className="text-gray-500">{order?.quantity}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
