import PollCard from "./PollCard";
import { useQuery } from "@apollo/client";
import { QUERYME } from "../utils/queries";

export default function Polls() {
  const { data, loading, error } = useQuery(QUERYME);
  const polls = data?.me.polls || [];
  if (!polls.length) {
    return (
      <h3 className="d-flex flex-column align-items-center justify-content-center col-lg-12 mx-auto">
        No polls yet
      </h3>
    );
  }

  if (loading) return <h2>Loading...</h2>;
  if (error) return <div>{error.message}</div>; // DEV ONLY

  return (
    <div className="col-lg-12 p-2">
      <h3
        className="text-light d-flex flex-column align-items-center justify-content-center col-lg-12 mx-auto"
      >
        User polls
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
