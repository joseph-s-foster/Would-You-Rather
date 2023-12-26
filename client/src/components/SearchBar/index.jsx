import React from "react";

const SearchBar = ({ handleSearchChange, searchInput }) => {
  return (
        <input
          style={{
            alignItems: "right",
            height: "48px",
            width: "360px",
            borderRadius: "5px",
            color: "#000",
            marginLeft: "16px"
          }}
          type="text"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="searchButton"
          value={searchInput}
          onChange={handleSearchChange}
        />
  );
};

export default SearchBar;
