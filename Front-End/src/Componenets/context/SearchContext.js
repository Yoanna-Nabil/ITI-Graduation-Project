// src/context/SearchContext.js
import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [signRate, setSignRate] = useState(0);
  const [priceFilter, setPriceFilter] = useState();
  const [RateFilter, setRateFilter] = useState();

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        isLoggedOut,
        setIsLoggedOut,
        signRate,
        setSignRate,
        priceFilter,
        setPriceFilter,
        RateFilter,
        setRateFilter,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};
