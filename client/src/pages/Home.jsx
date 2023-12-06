import { useQuery } from "@apollo/client";
import PollCard from "../components/PollCard";
import { GET_POLLS_QUERY } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(GET_POLLS_QUERY);
  const polls = data?.getPolls || [];
  if (loading) return <h2>Loading...</h2>;

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-12 mb-4 p-3"
          style={{ border: "1px solid #1a1a1a" }}
        >
          {polls && polls.map((poll) => <PollCard poll={poll} />)}
        </div>
      </div>
    </main>
  );
};

export default Home;
