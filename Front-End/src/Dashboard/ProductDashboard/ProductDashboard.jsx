import React, { useState } from "react";
import HeaderTable from "../ComponantDashboard/HeaderTable";
import { request, url } from "../../axios/axios";
import { useQuery } from "react-query";
import Loading from "../../ui/Loading";

import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
export default function ProductDashboard() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  /////////////start get All product///////////////
  function getAllProduct() {
    return request.get("/products");
  }
  let { isLoading, data, refetch } = useQuery(
    "allProductDashboard",
    getAllProduct
  );

  /////////////end get All product///////////////

  /////////start delete User////////////
  async function handleDelete(id) {
    swal({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((del) => {
      if (del) {
        request
          .delete(`/products/${id}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((result) => {
            swal(result?.data?.message, {
              icon: "success",
            });
            refetch();
          })
          .catch((error) => {
            swal(error?.response?.data?.message, {
              icon: "error",
            });
          });
      }
    });
  }

  /////////end delete user/////////////
  if (isLoading) return <Loading />;

  return (
    <div className="w-[95%] mx-auto mt-4 bg-white min-h-96 p-3">
      <div>
        <HeaderTable
          navigateTo={"/dashboard/addproductdashboard"}
          name={"Add New"}
          title={"Product Table"}
        />
      </div>
      <div className="flex justify-end mt-1">
        <input
          type="text"
          className="border border-slate-400 rounded-md outline-none px-2  w-72  caret-slate-300 py-[1px]"
          placeholder="search by name"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="relative overflow-x-auto mt-3 scrollbar overflow-y-auto h-[350px]">
        <table className="w-full text-sm  text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th className="px-6 py-3">name</th>
              <th className="px-6 py-3">category</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">price</th>
              <th className="px-6 py-3">image</th>
              <th className="px-6 py-4">offers</th>
              <th className="px-6 py-4">isExclusive</th>
              <th className="px-6 py-4">Review</th>

              <th className="px-6 py-3">action</th>
            </tr>
          </thead>
          <tbody>
            {search === "" && data
              ? data?.data?.data
                  .slice()
                  .reverse()
                  .map((user) => (
                    <tr
                      key={user?._id}
                      className="odd:bg-white  even:bg-gray-50  border-b "
                    >
                      <td className="px-6 py-4">{user?.name}</td>
                      <td className="px-6 py-4">{user?.categoryId?.name}</td>
                      <td className="px-6 py-4">{user?.Quantity}</td>
                      <td className="px-6 py-4">{user?.price}</td>

                      <td className="px-6 py-4">
                        <img
                          src={`${url}/img/${user?.image}`}
                          alt="product"
                          className="w-14"
                        />
                      </td>
                      <td className="px-6 py-4">
                        {user?.offres ? "true" : "false"}
                      </td>
                      <td className="px-6 py-4">
                        {user?.isExclusive ? "true" : "false"}
                      </td>
                      <td
                        className="px-6 py-4 cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/dashboard/productdashboardReview/${user?._id}`
                          )
                        }
                      >
                        Display
                      </td>
                      <td className="px-6 py-4 flex  gap-2">
                        <button
                          className="font-medium text-red-600 "
                          onClick={() => handleDelete(user?._id)}
                        >
                          delete
                        </button>
                        <button
                          className="font-medium text-blue-600 "
                          onClick={() =>
                            navigate(
                              `/dashboard/updateproductdashboard/${user?._id}`,
                              {
                                state: { data: user },
                              }
                            )
                          }
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
              : data?.data?.data
                  .slice()
                  .filter((e) => e?.name?.includes(search))
                  .reverse()
                  .map((user) => (
                    <tr
                      key={user?._id}
                      className="odd:bg-white  even:bg-gray-50  border-b "
                    >
                      <td className="px-6 py-4">{user?.name}</td>
                      <td className="px-6 py-4">{user?.categoryId?.name}</td>
                      <td className="px-6 py-4">{user?.Quantity}</td>
                      <td className="px-6 py-4">{user?.price}</td>
                      <td className="px-6 py-4">
                        <img
                          src={`${url}/img/${user?.image}`}
                          alt="product"
                          className="w-14"
                        />
                      </td>
                      <td className="px-6 py-4">
                        {user?.offres ? "true" : "false"}
                      </td>
                      <td className="px-6 py-4">
                        {user?.isExclusive ? "true" : "false"}
                      </td>
                      <td
                        className="px-6 py-4 cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/dashboard/productdashboardReview/${user?._id}`
                          )
                        }
                      >
                        Display
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          className="font-medium text-red-600 "
                          onClick={() => handleDelete(user?._id)}
                        >
                          delete
                        </button>
                        <button
                          className="font-medium text-blue-600 "
                          onClick={() =>
                            navigate(
                              `/dashboard/updateproductdashboard/${user?._id}`,
                              {
                                state: { data: user },
                              }
                            )
                          }
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
