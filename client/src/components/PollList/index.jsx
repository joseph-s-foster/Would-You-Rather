
// once able to get polls to render, will need to add a link to the Home page 
import { Link } from 'react-router-dom';
import PollCard from '../PollCard';

function PollList({ polls }) {
    if (!polls.length) {
        return <h3>No Polls Yet</h3>;
    }
    
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
    }

export default PollList;