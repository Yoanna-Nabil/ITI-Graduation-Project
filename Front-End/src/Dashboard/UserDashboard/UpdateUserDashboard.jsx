import React, { useEffect } from "react";
import HeaderTable from "../ComponantDashboard/HeaderTable";
import { useForm } from "react-hook-form";
import { request } from "../../axios/axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function UpdateUserDashboard() {
  const { id } = useParams();
  const { state } = useLocation();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
    setValue,
  } = useForm();
  /////////////////////////////
  useEffect(() => {
    if (state?.data) {
      setValue("name", state.data.name || "");
      setValue("email", state.data.email || "");
      setValue("role", state.data.role || "");
      setValue("address", state.data.address || "");
    }
  }, [state, setValue]);
  //////////////////////
  async function onSubmit(data) {
    await request
      .patch(`/users/${id}`, data)
      .then((result) => {
        if (result?.data?.message === "user updated successfully") {
          toast.success("user update successfuly");
          navigate("/dashboard/userdashboard");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.error);
      });
  }

  return (
    <div className="w-[95%] lg:max-w-lg mx-auto mt-4 bg-white min-h-96 p-3">
      <div>
        <HeaderTable navigateTo={"-1"} name={"back"} title={"updateUser"} />
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
          <label htmlFor="">Email</label>
          <input
            type="email"
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
            placeholder="Email"
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <small className="text-red-400">{errors.email.message}</small>
          )}
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="">role</label>
          <select
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
            {...register("role", {
              required: "role is required",
            })}
          >
            <option value="">choose role</option>

            <option value="Buyer">Buyer</option>
            <option value="Admin">Admin</option>
          </select>
          {errors.role && (
            <small className="text-red-400">{errors.role.message}</small>
          )}
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="">address</label>
          <input
            type="text"
            className="border border-slate-800 outline-none caret-slate-400 rounded-md py-1 px-2 placeholder:text-[14px]"
            placeholder="address"
            {...register("address", {
              required: "address is required",
            })}
          />
          {errors.address && (
            <small className="text-red-400">{errors.address.message}</small>
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
