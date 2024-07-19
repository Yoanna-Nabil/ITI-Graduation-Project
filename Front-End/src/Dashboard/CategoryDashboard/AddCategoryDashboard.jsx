import React, { useState } from "react";
import HeaderTable from "../ComponantDashboard/HeaderTable";
import { useForm } from "react-hook-form";
import { request } from "../../axios/axios";
import { toast } from "react-toastify";
import uploadImage from "../../helpers/uploadImage";

export default function AddCategoryDashboard() {
  const [uplaodImageLocal, setUploadImageLocal] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [imgCloudniry, setImgCloudniry] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  ////////////start upload image///////////
  async function handleChangeImage(e) {
    setLoadingImage(true);
    const file = e.target.files[0];
    setUploadImageLocal(e.target.files[0]);
    const upload = await uploadImage(file);
    setLoadingImage(false);
    setImgCloudniry(upload.url);
  }
  /////////////end upload image///////
  async function onSubmit(data) {
    await request
      .post(
        "/categories",
        {
          name: data.name,
          icon: imgCloudniry,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((result) => {
        console.log(result);
        if (result?.data?.message === "success") {
          toast.success("category create successfuly");
        }
      })
      .catch((error) => toast.error(error?.response?.data?.error));
  }

  return (
    <div className="w-[95%] lg:max-w-lg mx-auto mt-4 bg-white min-h-72 p-3">
      <div>
        <HeaderTable navigateTo={"-1"} name={"back"} title={"Add Category"} />
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
          <label htmlFor="imagecategory" className="cursor-pointer">
            Image
            <p className="border border-primaryDashboard p-1 rounded-lg mt-2">
              {uplaodImageLocal && !loadingImage
                ? uplaodImageLocal?.name
                : loadingImage
                ? "is Loading..."
                : "upload Image"}
            </p>
          </label>
          <input
            id="imagecategory"
            type="file"
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px] hidden"
            {...register("icon", {
              required: "image is required",
            })}
            onChange={handleChangeImage}
          />
          {errors.icon && (
            <small className="text-red-400">{errors.icon.message}</small>
          )}
        </div>
        <div>
          <button
            className="bg-buttonDashboard w-full mt-3 rounded-md p-1 duration-150 transition-all text-white font-semibold hover:bg-purple-700"
            onClick={handleSubmit(onSubmit)}
            disabled={loadingImage}
          >
            {isSubmitting ? "is Loading..." : "Add Category"}
          </button>
        </div>
      </div>
    </div>
  );
}
