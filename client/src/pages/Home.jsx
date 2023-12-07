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
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-12 mb-4 p-3"
          style={{
            display: "flex",
            flexDirection: "row", // Display in rows
            flexWrap: "wrap", // Allow items to wrap to the next row
          }}
        >
        

            {polls &&
            polls.map((poll) => (
              <PollCard poll={poll} key={poll.id} />
            ))}
          

        </div>
      </div>
    </main>
    </div>
  );
};

export default Home;
