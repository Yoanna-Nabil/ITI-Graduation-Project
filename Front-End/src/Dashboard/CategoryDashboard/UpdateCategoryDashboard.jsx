import React, { useEffect, useState } from "react";
import HeaderTable from "../ComponantDashboard/HeaderTable";
import { useForm } from "react-hook-form";
import { request } from "../../axios/axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import uploadImage from "../../helpers/uploadImage";

export default function UpdateCategoryDashboard() {
  const { id } = useParams();
  const { state } = useLocation();
  const [imgCloudniry, setImgCloudniry] = useState(state?.data?.icon);
  const [loadingImage, setLoadingImage] = useState(false);
  const [uplaodImageLocal, setUploadImageLocal] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
    setValue,
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
  /////////////////////////////
  useEffect(() => {
    if (state?.data) {
      setValue("name", state.data.name || "");
    }
  }, [state, setValue]);
  //////////////////////
  async function onSubmit(data) {
    await request
      .patch(`/categories/${id}`, {
        name: data?.name,
        icon: imgCloudniry,
      }, {
        headers: {
          Authorization:localStorage.getItem('token')
        }
      })
      .then((result) => {
        console.log(result);
        if (result?.data?.message === "success") {
          toast.success("category update successfuly");
          navigate("/dashboard/categorydashboard");
        }
      })
      .catch((error) => toast.error(error?.response?.data?.error));
  }

  return (
    <div className="w-[95%] lg:max-w-lg mx-auto mt-4 bg-white min-h-96 p-3">
      <div>
        <HeaderTable
          navigateTo={"-1"}
          name={"back"}
          title={"update category"}
        />
      </div>
      <div>
        <div className="flex flex-col gap-1">
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

        <div className="flex flex-col gap-1">
          <label htmlFor="updateCategory" className="cursor-pointer">
            image
            <p className="border border-primaryDashboard p-1 rounded-lg mt-2">
              {uplaodImageLocal && !loadingImage
                ? uplaodImageLocal?.name
                : loadingImage
                ? "is Loading..."
                : "update Image"}
            </p>
          </label>
          <input
            type="file"
            id="updateCategory"
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px] hidden"
            onChange={handleChangeImage}
          />
        </div>
        <div>
          <button
            className="bg-buttonDashboard w-full mt-3 rounded-md p-1 duration-150 transition-all text-white font-semibold hover:bg-purple-700"
                      onClick={ handleSubmit( onSubmit ) }
                      disabled={loadingImage}
          >
            {isSubmitting ? "is Loading..." : "update"}
          </button>
        </div>
      </div>
    </div>
  );
}
