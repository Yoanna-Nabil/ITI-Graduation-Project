import React, { useEffect} from "react";
import HeaderTable from "../ComponantDashboard/HeaderTable";
import { useForm } from "react-hook-form";
import { request } from "../../axios/axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function UpdateProduct() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
    setValue,
  } = useForm();
  ////////////start upload image///////////

  /////////////end upload image///////
  ////////////start upload images///////////

  /////////////////////////////
  useEffect(() => {
    if (state?.data) {
      setValue("name", state.data.name || "");
      setValue("price", state.data.price || "");
      setValue("Quantity", state.data.Quantity || "");
      setValue("description", state.data.description || "");
      setValue("priceAfterOffer", state.data.priceAfterOffer || "");
      setValue("offres", state.data.offres || "");
      setValue("isExclusive", state.data.isExclusive || "");
    }
  }, [state, setValue]);
  //////////////////////
  async function onSubmit(data) {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("Quantity", data.Quantity);
    formData.append("description", data.description);
    formData.append("priceAfterOffer", data.priceAfterOffer);
    if (data.offres) {
      formData.append("offres", data.offres);
    }
    if (data.isExclusive) {
      formData.append("isExclusive", data.isExclusive);
    }
    
    formData.append("categoryId", state.data.categoryId._id);
 
  
    await request
      .patch(`/products/${id}`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((result) => {
        console.log(result);
        if (result?.data?.message === "success") {
          toast.success("product update successfuly");
          navigate("/dashboard/productdashboard");
        }
      })
      .catch((error) => toast.error(error?.response?.data?.error));
  }

  return (
    <div className="w-[95%] lg:max-w-lg mx-auto mt-4 bg-white min-h-96 p-3">
      <div>
        <HeaderTable navigateTo={"-1"} name={"back"} title={"update product"} />
      </div>
      <div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="">Name</label>
          <input
            type="text"
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
            placeholder="Name"
            {...register("name", { required: "name is required" })}
          />
          {errors.name && (
            <small className="text-red-400">{errors.name.message}</small>
          )}
        </div>

        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="">price</label>
          <input
            type="number"
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
            placeholder="price"
            {...register("price", { required: "price is required" })}
          />
          {errors.price && (
            <small className="text-red-400">{errors.price.message}</small>
          )}
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="">Quantity</label>
          <input
            type="text"
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
            placeholder="Quantity"
            {...register("Quantity", {
              required: "Quantity is required",
            })}
          />
          {errors.Quantity && (
            <small className="text-red-400">{errors.Quantity.message}</small>
          )}
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="">Description</label>
          <textarea
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
            placeholder="description"
            {...register("description", {
              required: "description is required",
            })}
          />
          {errors.description && (
            <small className="text-red-400">{errors.description.message}</small>
          )}
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="">isExclusive</label>
          <select
            {...register("isExclusive")}
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
          >
            <option value="">choose</option>
            <option value="false">false</option>
            <option value="true">true</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="">offers</label>
          <select
            {...register("offres")}
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
          >
            <option value="">choose</option>
            <option value="false">false</option>
            <option value="true">true</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="">priceAfterOffer</label>
          <input
            type="number"
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
            placeholder="priceAfterOffer"
            {...register("priceAfterOffer")}
          />
          {errors.priceAfterOffer && (
            <small className="text-red-400">
              {errors.priceAfterOffer.message}
            </small>
          )}
        </div>
    

        <div>
          <button
            className="bg-buttonDashboard w-full mt-3 rounded-md p-1 duration-150 transition-all text-white font-semibold hover:bg-purple-700"
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? "is Loading..." : "update"}
          </button>
        </div>
      </div>
    </div>
  );
}
