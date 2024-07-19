import React, { useEffect, useState } from "react";
import HeaderTable from "../ComponantDashboard/HeaderTable";
import { request } from "../../axios/axios";
import { useQuery } from "react-query";
import Loading from "../../ui/Loading";
import { useNavigate } from "react-router-dom";
export default function OrdersDashboard() {
  const [valueSelect, setValueSelect] = useState();
  const [ selectedOrderId, setSelectedOrderId ] = useState( null );
  const navigate = useNavigate()
  function getOrders() {
    return request.get("/orders", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  }

  const { data, isLoading, refetch } = useQuery("getOrders", getOrders);
  useEffect(() => {
    async function handleChange() {
      if (selectedOrderId && valueSelect) {
        await request.put(
          `/orders/updataestatus/${selectedOrderId}`,
          {
            status: valueSelect,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        refetch();
      }
    }
    handleChange();
  }, [valueSelect, selectedOrderId, refetch]);
  if (isLoading) return <Loading />;
  return (
    <div className="w-[95%] mx-auto mt-4 bg-white min-h-96 p-3">
      <div>
        <HeaderTable title={"order Table"} />
      </div>
      <div className="relative overflow-x-auto mt-3 scrollbar overflow-y-auto h-[350px]">
        <table className="w-full text-sm  text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3">totalPrice</th>
              <th className="px-6 py-3">Details</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.data
                .filter((e) => e?.totalPrice !== 0)
                .map((user) => (
                  <tr
                    key={user?._id}
                    className="odd:bg-white  even:bg-gray-50  border-b "
                  >
                    <td className="px-6 py-4">{user?.user?.name}</td>

                    <td className="px-6 py-4">{user?.phone}</td>
                    <td className="px-6 py-4">{user?.shippingAddress1}</td>
                    <td className="px-6 py-4">{user?.totalPrice}</td>
                    <td
                      className="px-6 py-4 cursor-pointer"
                      onClick={() => navigate(`/dashboard/ordersDetails/${user?._id}`)}
                    >
                      Details
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        className={`font-bold ${
                          user.status === "Pending"
                            ? "bg-yellow-300"
                            : user.status === "shipped"
                            ? "bg-blue-300"
                            : user.status === "completed"
                            ? "bg-green-400"
                            : user.status === "canceled"
                            ? "bg-red-400"
                            : ""
                        } py-1 px-2 text-sm rounded-md text-black `}
                      >
                        {user?.status}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        className="font-medium bg-gray-300 py-1  text-sm rounded-md text-black"
                        onChange={(e) => {
                          setValueSelect(e.target.value);
                          setSelectedOrderId(user?._id);
                        }}
                      >
                        <option value="">choose Action</option>
                        <option
                          value="Pending"
                          disabled={user?.status === "canceled"}
                        >
                          Pending
                        </option>
                        <option
                          value="shipped"
                          disabled={user?.status === "canceled"}
                        >
                          shipped
                        </option>
                        <option
                          value="completed"
                          disabled={user?.status === "canceled"}
                        >
                          completed
                        </option>
                        <option value="canceled">canceled</option>
                      </select>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
