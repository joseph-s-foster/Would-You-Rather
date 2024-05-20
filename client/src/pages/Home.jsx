import React from "react";
import { useQuery } from "@apollo/client";
import Background from "../components/Background";
import PollCard from "../components/PollCard";
import { GET_POLLS_QUERY } from "../utils/queries";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";


const Home = () => {
  const { loading, data } = useQuery(GET_POLLS_QUERY, { pollInterval: 1000 });
  const polls = data?.getPolls || [];
  const [currPage, setCurrPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9); // Default items per page
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    // Check for mobile view and adjust itemsPerPage
    const handleResize = () => {
      setItemsPerPage(window.innerWidth <= 768 ? 3 : 9);
    };

    handleResize(); // Set initial value

    // Update itemsPerPage when the window is resized
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to run the effect only once on mount

  const startIndex = (currPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filter polls based on the search input
  const filteredPolls = polls.filter((poll) =>
    poll.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const currItems = filteredPolls.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredPolls.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrPage(newPage);
    // Reset the search input when the page changes
    // setSearchInput("");
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);
    setCurrPage(1); // Reset page when the search input changes
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <>
    <Background />
      <main className="d-flex flex-column align-items-center">
        <div className="row m-4">
          <h3 className="text-light m-4">Polls</h3>
          <div className="col-auto">
            <SearchBar
              handleSearchChange={handleSearchChange}
              searchInput={searchInput}
            />
          </div>
        </div>
        <div className="row justify-content-center">
          {currItems &&
            currItems.map((poll) => (
              <div className="col-lg-4 mb-3" key={poll.id}>
                {poll.id && <PollCard poll={poll} />}
              </div>
            ))}
        </div>
        <div className="container text-center mt-2 mb-2">
          <button
            onClick={() => handlePageChange(currPage - 1)}
            disabled={currPage === 1}
            className="btn btn-primary mr-1"
            style={{ width: "95px" }}
          >
            Prev
          </button>
          <button
            onClick={() => handlePageChange(currPage + 1)}
            disabled={currPage === totalPages}
            className="btn btn-primary ml-1"
            style={{ width: "96px" }}
          >
            Next
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
