import { useQuery } from "@apollo/client";


import PollCard from "../components/PollCard";
import PollForm from "../components/NewPollForm";

const Home = () => {


  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-lg-6 col-md-12 mb-4 p-3"
          style={{ border: "1px solid #1a1a1a" }}
        >
          <PollForm />
        </div>
      </div>
    </main>
  );
};

export default Home;
