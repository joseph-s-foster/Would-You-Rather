import PollCard from "./PollCard";
import { useQuery } from "@apollo/client";
import { QUERYME } from "../utils/queries";

export default function Polls() {
  const { data, loading, error } = useQuery(QUERYME, { pollInterval: 1000 });
  const polls = data?.me.polls || [];
  
  if (!polls.length) {
    return (
      <h3 className="d-flex flex-column col-lg-12" style={{ margin: "60px 0 60px 0", textAlign: "center", color: "#d9e9e8"}}>
        No polls yet
      </h3>
    );
  }

  if (loading) return <h2>Loading...</h2>;
  if (error) return <div>{error.message}</div>; // DEV ONLY

  return (
    <div className="col-lg-12 p-2">
      <h3 className="d-flex flex-column col-lg-12" style={{ margin: "60px 0 60px 0", textAlign: "center", color: "#d9e9e8"}}>
        User Polls
      </h3>
      <div className="row justify-content-center">
        {polls.map((poll, index) => (
          <div
            key={poll._id || poll.thisPoll + poll.thatPoll}
            className="col-lg-4 mb-3"
          >
            <PollCard poll={poll} />
          </div>
        ))}
      </div>
    </div>
  );
}
