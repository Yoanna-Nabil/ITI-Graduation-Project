import React from "react";
import ItemCounterInDashboard from "./ItemCounterInDashboard";
import { request } from "../../axios/axios";
import { useQuery } from "react-query";

export default function CounterInDashboard() {
  /////////////user/////////////
  function getCountUser() {
    return request.get("/users/count", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  }
  let { data: dataUser } = useQuery("counterUser", getCountUser);
  /////////////category/////////////////
  function getCountCategory() {
    return request.get("/categories/count", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  }
  let { data: dataCategory } = useQuery("counterCategory", getCountCategory);
  //////////product////////////
  function getCountProduct() {
    return request.get("/products/count", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  }
  let { data: dataProduct } = useQuery("counterProduct", getCountProduct);
  //////////order////////////

  return (
    <div className="w-[95%]  mx-auto  mt-3">
      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
        <ItemCounterInDashboard
          name={"user"}
          counter={dataUser?.data?.userCount}
          color={"#8f8fe0"}
        />
        <ItemCounterInDashboard
          name={"product"}
          counter={dataProduct?.data?.productCount}
          color={"#8fc78f"}
        />
        <ItemCounterInDashboard
          name={"category"}
          counter={dataCategory?.data?.categoryCount}
          color={"#ff5300"}
        />
      </div>
    </div>
  );
}
