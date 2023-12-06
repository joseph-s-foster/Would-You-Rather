
// once able to get polls to render, will need to add a link to the Home page 
import PollCard from '../PollCard';
import { useQuery } from '@apollo/client';
import { QUERYME } from '../../utils/queries';

export default function PollList() {
  const {data, loading, error} = useQuery(QUERYME);
  const polls = data?.me.polls || [];
    if (!polls.length) {
        return <h3>No Polls Yet</h3>;
    }

    if (loading) return <h2>Loading...</h2>
    if (error) return <div>{error.message}</div> // DEV ONLY

    return (
      <div>
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
              <div key={poll._id} className="col-lg-4 col-md-6 col-sm-12 mb-3">
                <PollCard poll={poll} />
              </div>
            ))}
        </div>
      </div>
    );
    };