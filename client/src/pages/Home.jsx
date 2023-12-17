import { useQuery } from "@apollo/client";
import PollCard from "../components/PollCard";
import { GET_POLLS_QUERY } from "../utils/queries";
import { useState } from "react";

const Home = () => {
  const { loading, data } = useQuery(GET_POLLS_QUERY, { pollInterval: 1000 });
  const polls = data?.getPolls || [];
  const [currPage, setCurrPage] = useState(1);
  const itemsPerPage = 9;
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
      <div className="container text-center mb5">
        <button
          onClick={() => handlePageChange(currPage - 1)}
          disabled={currPage === 1}
          className="btn btn-primary mr-1" // Adjust the styling as needed
        >
          Prev
        </button>
        <button
          onClick={() => handlePageChange(currPage + 1)}
          disabled={currPage === totalPages}
          className="btn btn-primary ml-1" // Adjust the styling as needed
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default Home;
