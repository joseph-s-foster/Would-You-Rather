import { useQuery } from "@apollo/client";


import PollCard from "../components/PollCard";

import { GET_POLLS_QUERY } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(GET_POLLS_QUERY);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-12 mb-4 p-3"
          style={{ border: "1px solid #1a1a1a" }}
        >
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PollCard />
            // <ThoughtList
            //   thoughts={thoughts}
            //   // title="User Polls"
            // />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
