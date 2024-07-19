import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { request } from "../../axios/axios";
import { toast } from "react-toastify";

export default function EditProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  /////////////////////////////
  useEffect(() => {
    if (user) {
      setValue("name", user?.name || "");
      setValue("email", user?.email || "");
      setValue("address", user?.address || "");
    }
  }, [setValue, user]);
  //////////////////////
  async function onSubmit(data) {
    await request
      .patch(`/users/${user?._id}`, data)
      .then((result) => {
        console.log(result);
        if (result?.data?.message === "user updated successfully") {
          toast.success("user update successfuly");
          localStorage.setItem("user", JSON.stringify(result?.data?.data));
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.error);
      });
  }

  return (
    <form className="w-[95%] mx-auto">
      <div className="row bg-light bg-opacity-25 shadow w-100 p-5 rounded-2 mt-5 mb-5">
        <p className=" text-danger fw-bolder fs-4">Edit your Profile</p>
        <div className="mt-2">
          <div className="edit-profile1 ">
            <label htmlFor="first-name">Name</label>
            <input
              id="first-name"
              name="first-name"
              placeholder="Enter your first name"
              className="form-control"
              {...register("name", { required: "name is required" })}
            />
            {errors.name && (
              <small className="text-red-400">{errors.name.message}</small>
            )}
          </div>
        </div>
        <div className=" mt-4">
          <div className="edit-profile1 ">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              placeholder="Enter your email"
              className="form-control"
              {...register("email", { required: "email is required" })}
            />
            {errors.email && (
              <small className="text-red-400">{errors.email.message}</small>
            )}
          </div>
        </div>

        <div className=" mt-4">
          <div className="edit-profile1 ">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              placeholder="Enter your address"
              className="form-control"
              {...register("address", { required: "address is required" })}
            />
            {errors.address && (
              <small className="text-red-400">{errors.address.message}</small>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="password-changes">Password Changes</label>
          <input
            id="password-changes"
            name="password-changes"
            placeholder="password"
            className="form-control mt-2"
            {...register("password")}
          />
        </div>

        <div className="mt-4">
          <button
            className="btn btn-info text-dark me-0"
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? "Loading..." : "  Save Changes"}
          </button>
          <button className="btn btn-outline-danger text-black ms-2">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
