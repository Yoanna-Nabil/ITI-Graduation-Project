import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiTimer } from "react-icons/ci";
import { RiUserSearchLine } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import logo from "../../Assets/tecno-logo.png";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaBorderAll } from "react-icons/fa6";
export default function SideBarDashboard() {
  const navigate = useNavigate();
  return (
    <div className="fixed lg:w-[15%] smm:w-[40px] overflow-hidden bg-white h-[100vh] smm:h-[200vh] lg:px-2 py-4 ">
      <div>
        <div
          className="w-full flex justify-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" className="w-10 smm:w-8 rounded-lg" />
        </div>
        <ul className="smm:p-2 mt-5">
          <Link>
            <li className="flex gap-1 items-center  text-slate-700 font-semibold smm:mb-4">
              <CiTimer size={20} />
              <p className="smm:hidden mt-3">Dashboard</p>
            </li>
          </Link>
          <Link to={"/dashboard/userdashboard"}>
            <li className="flex gap-1 items-center  text-slate-700 font-semibold smm:mb-4">
              <RiUserSearchLine size={20} />
              <p className="smm:hidden mt-3">Users</p>
            </li>
          </Link>
          <Link to={"/dashboard/categorydashboard"}>
            <li className="flex gap-1 items-center  text-slate-700 font-semibold smm:mb-4">
              <BiCategoryAlt size={20} />
              <p className="smm:hidden mt-3">Category</p>
            </li>
          </Link>
          <Link to={"/dashboard/productdashboard"}>
            <li className="flex gap-1 items-center  text-slate-700 font-semibold smm:mb-4">
              <MdProductionQuantityLimits size={20} />
              <p className="smm:hidden mt-3">Product</p>
            </li>
          </Link>
          <Link to={"/dashboard/ordersdashboard"}>
            <li className="flex gap-1 items-center  text-slate-700 font-semibold smm:mb-4">
              <FaBorderAll size={20} />

              <p className="smm:hidden mt-3">Orders</p>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
