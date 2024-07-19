import React, { useState } from "react";
import HeaderTable from "../ComponantDashboard/HeaderTable";
import { useForm } from "react-hook-form";
import { urlLocal } from "../../axios/axios";
import { toast } from "react-toastify";
import { getAllCategory } from "../../api/api";
import { useQuery } from "react-query";
import axios from "axios";

export default function AddProduct() {
  const [image, setImage] = useState();
  const [images, setImages] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  ////////////start upload image///////////
  function handleImg(e) {
    setImage(e.target.files[0]);
  }
  ////////////start upload images///////////
  function handleImgs(e) {
    setImages(e.target.files);
  }
  ////////////start get category/////////////
  let { data } = useQuery("allCategoryDashboard", getAllCategory);
  //////////////end get category///////////
  /////////////end upload image///////
  async function onSubmit(data) {
    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("categoryId", data?.categoryId);
    formData.append("price", data?.price);
    formData.append("Quantity", data?.Quantity);
    formData.append("description", data?.description);

    if (data?.isExclusive) {
      formData.append("isExclusive", data?.isExclusive);
    }
    if (data?.offres) {
      formData.append("offres", data?.offres);
    }
    formData.append("priceAfterOffer", data?.priceAfterOffer);

    formData.append("image", image);
    if (Array.isArray(images)) {
      images.forEach((file) => {
        formData.append("images", file);
      });
    } else if (images instanceof FileList) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }
    await axios
      .post(`${urlLocal}/products`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((result) => {
        if (result?.data?.message === "success") {
          toast.success("product create successfuly");
        }
      })
      .catch((error) => toast.error(error?.response?.data?.error));
  }

  return (
    <div className="w-[95%] lg:max-w-lg mx-auto mt-4 bg-white min-h-72 p-3">
      <div>
        <HeaderTable navigateTo={"-1"} name={"back"} title={"Add product"} />
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
          <label htmlFor="">category</label>
          <select
            name=""
            id=""
            {...register("categoryId", {
              required: "category is required",
            })}
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
          >
            <option value="">choose the category</option>
            {data?.data?.data?.map((category) => (
              <option value={category?._id} key={category?._id}>
                {category?.name}
              </option>
            ))}
          </select>

          {errors.categoryId && (
            <small className="text-red-400">{errors.categoryId.message}</small>
          )}
        </div>

        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="">price</label>
          <input
            type="number"
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
            placeholder="price"
            {...register("price", {
              required: "price is required",
            })}
          />
          {errors.price && (
            <small className="text-red-400">{errors.price.message}</small>
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
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="">Quantity</label>
          <input
            type="text"
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
            placeholder="Quantity"
            {...register("Quantity", {
              required: "Quantity is required",
              max: {
                value: 255,
                message: "max length 255",
              },
            })}
          />
          {errors.Quantity && (
            <small className="text-red-400">{errors.Quantity.message}</small>
          )}
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="imageProduct" className="cursor-pointer">
            Image
          </label>
          <input
            id="imageProduct"
            type="file"
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
            {...register("image", {
              required: "image is required",
            })}
            onChange={handleImg}
          />
          {errors.image && (
            <small className="text-red-400">{errors.image.message}</small>
          )}
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="imageProducts" className="cursor-pointer">
            Images
          </label>
          <input
            id="imageProducts"
            type="file"
            multiple
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
            {...register("images", {
              required: "images is required",
            })}
            onChange={handleImgs}
          />
          {errors.images && (
            <small className="text-red-400">{errors.images.message}</small>
          )}
        </div>
        <div>
          <button
            className="bg-buttonDashboard w-full mt-3 rounded-md p-1 duration-150 transition-all text-white font-semibold hover:bg-purple-700"
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? "is Loading..." : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
