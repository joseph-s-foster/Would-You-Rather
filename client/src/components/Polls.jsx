import PollCard from "./PollCard";
import { useQuery } from "@apollo/client";
import { QUERYME } from "../utils/queries";

export default function Polls() {
  const { data, loading, error } = useQuery(QUERYME);
  const polls = data?.me.polls || [];
  if (!polls.length) {
    return <h3>No Polls Yet</h3>;
  }

  if (loading) return <h2>Loading...</h2>;
  if (error) return <div>{error.message}</div>; // DEV ONLY

  return (
    <div className="mt-4">
      <h3>User polls</h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          margin: "20px",
        }}
      >
        {polls &&
          polls.map((poll) => (
            <div key={poll._id || poll.thisPoll + poll.thatPoll} className="col-lg-4 col-md-6 col-sm-12 mb-3">
              <PollCard poll={poll} />
            </div>
          ))}
      </div>
    </div>
  );
}
