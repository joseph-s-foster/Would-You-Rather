import { useQuery } from "@apollo/client";

import ThoughtList from "../components/ThoughtList";
import ThoughtForm from "../components/ThoughtForm";

import { QUERY_THOUGHTS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-12 mb-4 p-3"
          style={{ border: "1px solid #1a1a1a" }}
        >
          <ThoughtForm />
        </div>
        <div
          className="col-12 col-md-12 mb-4 p-3"
          style={{ border: "1px solid #1a1a1a" }}
        >
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              // title="User Polls"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
