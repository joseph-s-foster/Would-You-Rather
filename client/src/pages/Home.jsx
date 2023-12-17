import { useQuery } from "@apollo/client";
import PollCard from "../components/PollCard";
import { GET_POLLS_QUERY } from "../utils/queries";
import { useState, useEffect } from "react";

const Home = () => {
  const { loading, data } = useQuery(GET_POLLS_QUERY, { pollInterval: 1000 });
  const polls = data?.getPolls || [];
  const [currPage, setCurrPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9); // Default items per page

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
  const currItems = polls.slice(startIndex, endIndex);
  const totalPages = Math.ceil(polls.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrPage(newPage);
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <main className="d-flex flex-column align-items-center">
      <h3 className="text-light">Polls</h3>
      <div className="row justify-content-center">
        {currItems &&
          currItems.map((poll) => (
            <div className="col-lg-4 mb-3" key={poll.id}>
              {poll.id && <PollCard poll={poll} />}
            </div>
          ))}
      </div>
      <div className="container text-center">
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
  );
};

export default Home;
