import { Link } from 'react-router-dom';

const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!thoughts.length) {
    return <h3>No Polls Yet</h3>;
  }

  return (
    <div>
       <h3>User polls</h3>
    <div className="row">
      
      {showTitle && <h3>{title}</h3>}
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <div className="card">
              <h4 className="card-header bg-primary text-light p-2 m-0">
                {showUsername ? (
                  <Link
                    className="text-light"
                    to={`/profiles/${thought.thoughtAuthor}`}
                  >
                    {thought.thoughtAuthor} 
                    {/* <br />
                    <span style={{ fontSize: '1rem' }}>
                      had this thought on {thought.createdAt}
                    </span> */}
                  </Link>
                ) : (
                  <>
                    <span style={{ fontSize: '1rem' }}>
                      You had this thought on {thought.createdAt}
                    </span>
                  </>
                )}
              </h4>
              <div className="card-body bg-light p-2">
                <p>{thought.thoughtText}</p>
              </div>
              <Link
                className="btn btn-primary btn-block btn-squared"
                to={`/thoughts/${thought._id}`}
              >
                Join the discussion.
              </Link>
            </div>
          </div>
        ))}
    </div>
    </div>
  );
};

export default ThoughtList;
