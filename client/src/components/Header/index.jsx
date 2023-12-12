import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Auth from "../../utils/auth";

const Header = () => {
  const location = useLocation();

  const [isUserPollsPage, setIsUserPollsPage] = useState(false);

  useEffect(() => {
    setIsUserPollsPage(location.pathname === "/user-polls");
  }, [location.pathname]);

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
            !isUserPollsPage && (
              <p className="mb-2">Login to create polls and submit data.</p>
            )
          )}
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              {isUserPollsPage ? (
                <Link className="btn btn-lg btn-danger m-2" to="/">
                  Home
                </Link>
              ) : (
                <Link className="btn btn-lg btn-danger m-2" to="/user-polls">
                  User Polls
                </Link>
              )}
              <button className="btn btn-lg btn-light ml-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            // Render the "Login" button only if not on the "/login" page
            !isUserPollsPage && (
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