import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-primary text-light mb-4 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">Would You Rather</h1>
          </Link>
          <p className="m-0">
            See top of the minute polls where decisions shape the fun!
          </p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
             <Link className="btn btn-lg btn-danger m-1" to="/user-polls">
                Manage Polls
              </Link>
              <button className="btn btn-lg btn-light ml-1" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info ml-1" to="/login">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
