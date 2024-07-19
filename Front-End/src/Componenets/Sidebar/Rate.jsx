import React from "react";
import { IoMdStar } from "react-icons/io";
import { useSearch } from "../context/SearchContext";

function Rate() {
  const { setPriceFilter,  setRateFilter } =
    useSearch();
  function changeRate(e) {
    setPriceFilter("");
    setRateFilter(e.target.value);
  }
  return (
    <div className="mt-7">
      <h5>Rate</h5>
      <div
        className="form-check p-1 flex flex-row items-center mt-4"
        onClick={changeRate}
      >
        <input
          className="form-check-input"
          type="radio"
          name="exampleRadios"
          id="exampleRadios1"
          value="1"
        />
        <label className="form-check-label flex" htmlFor="exampleRadios1">
          <IoMdStar size={25} fill="#ffc908" />
        </label>
      </div>
      <div
        className="form-check p-1 flex flex-row items-center"
        onClick={changeRate}
      >
        <input
          className="form-check-input"
          type="radio"
          name="exampleRadios"
          id="exampleRadios2"
          value="2"
        />
        <label className="form-check-label flex" htmlFor="exampleRadios2">
          <IoMdStar size={25} fill="#ffc908" />
          <IoMdStar size={25} fill="#ffc908" />
        </label>
      </div>
      <div
        className="form-check p-1 flex flex-row items-center"
        onClick={changeRate}
      >
        <input
          className="form-check-input"
          type="radio"
          name="exampleRadios"
          id="exampleRadios3"
          value="3"
        />
        <label className="form-check-label flex" htmlFor="exampleRadios3">
          <IoMdStar size={25} fill="#ffc908" />
          <IoMdStar size={25} fill="#ffc908" />
          <IoMdStar size={25} fill="#ffc908" />
        </label>
      </div>
      <div
        className="form-check p-1 flex flex-row items-center"
        onClick={changeRate}
      >
        <input
          className="form-check-input"
          type="radio"
          name="exampleRadios"
          id="exampleRadios4"
          value="4"
        />
        <label className="form-check-label flex" htmlFor="exampleRadios4">
          <IoMdStar size={25} fill="#ffc908" />
          <IoMdStar size={25} fill="#ffc908" />
          <IoMdStar size={25} fill="#ffc908" />
          <IoMdStar size={25} fill="#ffc908" />
        </label>
      </div>
      <div
        className="form-check p-1 flex flex-row items-center"
        onClick={changeRate}
      >
        <input
          className="form-check-input"
          type="radio"
          name="exampleRadios"
          id="exampleRadios5"
          value="5"
        />
        <label className="form-check-label flex" htmlFor="exampleRadios5">
          <IoMdStar size={25} fill="#ffc908" />
          <IoMdStar size={25} fill="#ffc908" />
          <IoMdStar size={25} fill="#ffc908" />
          <IoMdStar size={25} fill="#ffc908" />
          <IoMdStar size={25} fill="#ffc908" />
        </label>
      </div>
    </div>
  );
}

export default Rate;
