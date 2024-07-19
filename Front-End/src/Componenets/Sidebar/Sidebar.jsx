import React from "react";
import Rate from "./Rate";
import { useSearch } from "../context/SearchContext";

function Sidebar() {
  const { setPriceFilter, setRateFilter } = useSearch();
  function changePrice(e) {
    setRateFilter("");
    setPriceFilter(e.target.value);
  }
  return (
    <div>
      <div>
        <h5 className="mt-10">Price</h5>
        <div className="form-check p-1 mt-4" onClick={changePrice}>
          <input
            className="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios"
            value=""
            defaultChecked
          />
          <label className="form-check-label" htmlFor="exampleRadios">
            All
          </label>
        </div>
        <div className="form-check p-1" onClick={changePrice}>
          <input
            className="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios1"
            value="5000"
          />
          <label className="form-check-label" htmlFor="exampleRadios1">
            5000 L.E -10000 L.E
          </label>
        </div>
        <div className="form-check p-1" onClick={changePrice}>
          <input
            className="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios1"
            value="10000"
          />
          <label className="form-check-label" htmlFor="exampleRadios1">
            10000 L.E - 15000 L.E
          </label>
        </div>
        <div className="form-check p-1" onClick={changePrice}>
          <input
            className="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios1"
            value="15000"
          />
          <label className="form-check-label" htmlFor="exampleRadios1">
            15000 L.E - 20000 L.E
          </label>
        </div>
        <div className="form-check p-1" onClick={changePrice}>
          <input
            className="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios1"
            value="20000"
          />
          <label className="form-check-label" htmlFor="exampleRadios1">
            20000 L.E - 25000 L.E
          </label>
        </div>
        <div className="form-check p-1" onClick={changePrice}>
          <input
            className="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios1"
            value="30000"
          />
          <label className="form-check-label" htmlFor="exampleRadios1">
            Above 25000 L.E
          </label>
        </div>
      </div>
      <div>
        <Rate />
      </div>
    </div>
  );
}

export default Sidebar;
