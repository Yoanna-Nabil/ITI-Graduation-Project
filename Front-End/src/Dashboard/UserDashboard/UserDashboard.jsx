import React, { useState } from "react";
import HeaderTable from "../ComponantDashboard/HeaderTable";
import { request } from "../../axios/axios";
import { useQuery } from "react-query";
import Loading from "../../ui/Loading";

import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
export default function UserDashboard() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  /////////////start get All User///////////////
  function getAllUser() {
    return request.get("/users");
  }
  let { isLoading, data, refetch } = useQuery("allUserDashboard", getAllUser);
  /////////////end get All User///////////////
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
          .delete(`/users/${id}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then( ( result ) => {
            console.log(result)
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
          navigateTo={"/dashboard/adduserdashboard"}
          name={"Add New"}
          title={"user Table"}
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
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Address</th>

              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {search === ""
              ? data &&
                data?.data?.data
                  ?.slice()
                  .reverse()
                  .map((user) => (
                    <tr
                      key={user?._id}
                      className="odd:bg-white  even:bg-gray-50  border-b "
                    >
                      <td className="px-6 py-4">{user?.name}</td>
                      <td className="px-6 py-4">{user?.email}</td>
                      <td className="px-6 py-4">{user?.address}</td>
                      <td className="px-6 py-4">{user?.role}</td>
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
                              `/dashboard/updateuserdashboard/${user?._id}`,
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
                  ?.filter(
                    (e) =>
                      e?.name?.includes(search) || e?.email?.includes(search)
                  )
                  .slice()
                  .reverse()
                  .map((user) => (
                    <tr
                      key={user?._id}
                      className="odd:bg-white  even:bg-gray-50  border-b "
                    >
                      <td className="px-6 py-4">{user?.name}</td>
                      <td className="px-6 py-4">{user?.email}</td>
                      <td className="px-6 py-4">{user?.address}</td>
                      <td className="px-6 py-4">{user?.role}</td>
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
                              `/dashboard/updateuserdashboard/${user?._id}`,
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
