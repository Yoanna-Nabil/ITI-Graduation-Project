import React, { useEffect } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MdDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { FaFirstOrder } from "react-icons/fa6";
import { CiBookmarkCheck } from "react-icons/ci";
import {
  faHeart,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useSearch } from "../context/SearchContext";
import { GoSignIn } from "react-icons/go";

export default function Navbar() {
  const { getTotalQuantity } = useShoppingCart();
  const { isLoggedOut, setIsLoggedOut, setSearchQuery, searchQuery } =
    useSearch();
  const totalQuantity = getTotalQuantity();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchQuery) {
      navigate("/filters");
    }
  }, [navigate, searchQuery]);

  function handleLogout() {
    localStorage.clear();
    navigate("/");
    window.location.reload();
    setIsLoggedOut(true);
  }

  useEffect(() => {
    if (isLoggedOut) {
      setIsLoggedOut(false);
    }
  }, [isLoggedOut, setIsLoggedOut]);

  return (
    <nav className="navbar p-3">
      <div
        className="navbar-logo  cursor-pointer"
        onClick={() => navigate("/")}
      >
        <h1>
          Techno<span className="text-danger">Core</span>
        </h1>
      </div>
      <div className="navbar-search">
        <input
          type="text"
          placeholder="What are you looking for?"
          onChange={handleSearch}
        />
      </div>
      <div className="navbar-icons ">
        <Link className="navbar-icon " to={"/aboutus"}>
          <CiBookmarkCheck size={30} />
        </Link>
        {localStorage.getItem("token") && (
          <Link className="navbar-icon user" to={"/orders"}>
            <FaFirstOrder />
          </Link>
        )}
        {localStorage.getItem("token") && (
          <Link to={"/whislist"} className="navbar-icon">
            <FontAwesomeIcon icon={faHeart} />
          </Link>
        )}
        {localStorage.getItem("token") && (
          <Link to={"/cart"} className="navbar-icon">
            <FontAwesomeIcon icon={faShoppingCart} />
            {totalQuantity > 0 && (
              <span className="navbar-icon-badge">{totalQuantity}</span>
            )}
          </Link>
        )}
        {!localStorage.getItem("token") && (
          <Link to={"/login"} className="navbar-icon user">
            <GoSignIn />
          </Link>
        )}
        {localStorage.getItem("token") && (
          <Link to={"/editprofile"} className="navbar-icon user">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        )}
        {localStorage.getItem("roleUser") === "Admin" && (
          <button
            onClick={() => navigate("/dashboard")}
            className="navbar-icon user"
          >
            <MdDashboard />
          </button>
        )}
        {localStorage.getItem("token") && (
          <button className="navbar-icon user" onClick={handleLogout}>
            <FiLogOut />
          </button>
        )}
      </div>
    </nav>
  );
}
