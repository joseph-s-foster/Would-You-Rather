import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Auth from "../../utils/auth";
import SearchBar from "../SearchBar";

const Header = () => {
  const location = useLocation();

  const [isUserPollsPage, setIsUserPollsPage] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);

  useEffect(() => {
    setIsUserPollsPage(location.pathname === "/user-polls");
    setIsLoginPage(location.pathname === "/login");
  }, [location.pathname]);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.href = "/";
  };

  return (
    <header className="bg-black text-light mb-4 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="mb-1">Would You Rather</h1>
          </Link>
          {Auth.loggedIn() ? (
            <p></p>
          ) : (
            !isUserPollsPage && !isLoginPage && (
              <p className="mb-2">Login to create polls and submit data.</p>
            )
          )}
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              {isUserPollsPage ? (
                <Link className="btn btn-lg btn-primary m-2" to="/">
                  Home
                </Link>
              ) : (
                <Link className="btn btn-lg btn-primary m-2" to="/user-polls">
                  User Polls
                </Link>
              )}
              <button className="btn btn-lg btn-light ml-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            // Render the "Login" button or "Home" button based on the page
            !isUserPollsPage && (
              <Link
                className="btn btn-lg btn-primary m-2"
                to={isLoginPage ? "/" : "/login"}
              >
                {isLoginPage ? "Home" : "Login"}
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;