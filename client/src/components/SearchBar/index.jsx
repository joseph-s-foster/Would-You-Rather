import React from "react";

const SearchBar = ({ handleSearchChange, searchInput }) => {
  return (
    <input
      style={{
        flex: "1", // Use flex-grow to fill remaining width
        height: "48px",
        borderRadius: "5px",
        color: "#000",
        background: "#d9e9e8",
        marginLeft: "16px",
        marginRight: "16px",
        width: "94.5%", // Set width to 100% to fill the available space
        // maxWidth: "1075px" // Optional: Set a maximum width if needed
      }}
      type="text"
      placeholder="Search by title"
      aria-label="Search"
      aria-describedby="searchButton"
      value={searchInput}
      onChange={handleSearchChange}
    />
  );
};

export default SearchBar;
