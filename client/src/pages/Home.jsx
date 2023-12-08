import { useQuery } from "@apollo/client";
import PollCard from "../components/PollCard";
import { GET_POLLS_QUERY } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(GET_POLLS_QUERY);
  const polls = data?.getPolls || [];
  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="area">
            <ul className="circles">
              {[...Array(10)].map((_, index) => (
                <li key={index}></li>
              ))}
            </ul>


    <main>
      <h3 className="d-flex flex-column align-items-center justify-content-center col-lg-12 mx-auto">
        Polls
      </h3>
      <div className="row justify-content-center">
        {polls &&
          polls.map((poll) => (
            <div className="col-lg-4 mb-3" key={poll.id}>
              {poll.id && <PollCard poll={poll} />}
            </div>
          ))}
      </div>
    </main>
    </div>
  );
};

export default Home;
