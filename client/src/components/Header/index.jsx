import { Link, useLocation } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
  const location = useLocation();
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.href = "/"; // Redirect to the home page
  };

  return (
    <header className="bg-black text-light mb-4 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="mb-2 mt-1">Would You Rather</h1>
          </Link>
          {Auth.loggedIn() ? (
            <p></p>
          ) : (
            location.pathname !== "/login" && (
              <p className="mb-2">Login to create polls and submit data.</p>
            )
          )}
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-danger m-2" to="/user-polls">
                User Polls
              </Link>
              <button className="btn btn-lg btn-light ml-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            // Render the "Login" button only if not on the "/login" page
            location.pathname !== "/login" && (
              <Link className="btn btn-lg btn-danger m-2" to="/login">
                Login
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
