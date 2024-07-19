import React from "react";
import HeaderTable from "../ComponantDashboard/HeaderTable";
import { request } from "../../axios/axios";
import { useQuery } from "react-query";
import Loading from "../../ui/Loading";
import { useParams } from "react-router-dom";
import swal from "sweetalert";

export default function ReviewProductDashboard() {
  /////////////start get All product///////////////
  const { id } = useParams();
  function getAllProduct() {
    return request.get(`/products/single/${id}`);
  }
  let { isLoading, data, refetch } = useQuery(
    ["allReviewProductDashboard", id],
    () => getAllProduct(id)
  );
  /////////start delete user///////////
  async function handleDelete(id) {
    swal({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((del1) => {
      if (del1) {
        request
          .delete(`/ratingsAndReviews/deleteReview/${id}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((result) => {
            swal('Review Deleted Successfully', {
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
        <HeaderTable navigateTo={"-1"} name={"back"} title={"Review Table"} />
      </div>

      <div className="relative overflow-x-auto mt-3 scrollbar overflow-y-auto h-[350px]">
        <table className="w-full text-sm  text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th className="px-6 py-3">description</th>
              <th className="px-6 py-3">rating</th>

              <th className="px-6 py-3">name User</th>

              <th className="px-6 py-3">Delete</th>
            </tr>
          </thead>

          <tbody>
            {data && data?.data?.data?.ratingAndReviews.length > 0 ? (
              data?.data?.data?.ratingAndReviews
                .slice()
                .reverse()
                .map((user) => (
                  <tr
                    key={user?._id}
                    className="odd:bg-white  even:bg-gray-50  border-b"
                  >
                    <td className="px-6 py-4">{user?.description}</td>
                    <td className="px-6 py-4">{user?.rating}</td>
                    <th className="px-6 py-4">{user?.userId?.name}</th>
                    <td
                      className="px-6 py-4 text-red-400 cursor-pointer"
                      onClick={() => handleDelete(user?._id)}
                    >
                      delete
                    </td>
                  </tr>
                ))
            ) : (
              <tr className="mt-5 absolute left-[50%] translate-x-[-50%]">
                <td className="text-lg font-bold">Not Review Yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
