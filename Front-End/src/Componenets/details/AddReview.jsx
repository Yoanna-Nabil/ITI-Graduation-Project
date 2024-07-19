import React, { useState } from "react";
import RatingAsign from "../../ui/RatingAsign";
import { request } from "../../axios/axios";
import { useSearch } from "../context/SearchContext";
import { toast } from "react-toastify";
import LoadingButton from "../../ui/LoadingButton";
import { useNavigate } from "react-router-dom";

export default function AddReview({ id, refetch }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const { signRate, setSignRate } = useSearch();
  const [loading, setLoading] = useState(false);
  const [descriptionClient, setDescriptionClient] = useState("");
  const navigate = useNavigate();
  async function handleAddReview() {
    if (!localStorage.getItem("token")) return navigate("/login");
    if (signRate === 0 || descriptionClient === "")
      return toast.warn("you Must Add Rating And Review");
    try {
      setLoading(true);
      const response = await request.post(
        `/ratingsAndReviews/${user._id}/${id}`,
        {
          rating: signRate,
          description: descriptionClient,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response?.data?.message === "succes") {
        toast.success("created Review successfuly");
        refetch();
        setSignRate(0);
        setDescriptionClient("");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  }
  return (
    <div>
      <div className="w-[100%]">
        <div>
          <h5 className="font-bold">Rate This Product</h5>
          <RatingAsign size={20} />
        </div>
        <div className="mt-3">
          <h6 className="font-semibold">Your Review</h6>
          <textarea
            onChange={(e) => setDescriptionClient(e.target.value)}
            value={descriptionClient || ""}
            className="w-100 h-[100px] border border-gray-400 outline-none rounded-lg p-2"
          ></textarea>
        </div>
        <button
          className="bg-red-600 px-2 rounded-md py-1 font-medium text-md text-white hover:bg-gray-400 transition-all duration-150 mt-2"
          onClick={handleAddReview}
        >
          {loading ? <LoadingButton /> : "send your rate"}
        </button>
      </div>
    </div>
  );
}
