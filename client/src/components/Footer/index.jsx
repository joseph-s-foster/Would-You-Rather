import { useLocation, useNavigate } from "react-router-dom";
import { ArrowUpCircleIcon, HomeModernIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isUserPollsPage, setIsUserPollsPage] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);

  useEffect(() => {
    setIsUserPollsPage(location.pathname === "/user-polls");
    setIsLoginPage(location.pathname === "/login");
  }, [location.pathname]);

  const handleScroll = (event) => {
    event.preventDefault();
    const topContainer = document.getElementById("top");
    if (topContainer) {
      topContainer.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Defines the footer display based on the current page
  const footerStyle = isLoginPage
    ? {
        display: "none",
      }
    : {};

  return (
    <footer style={footerStyle}>
      <div className="container text-center mb-5">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "32px 0 32px 0",
          }}
        >
          <a onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <HomeModernIcon
              style={{
                margin: "4px 7px 0 0",
                color: "#fff",
                height: "32px",
                width: "32px",
              }}
              aria-hidden="true"
            />
          </a>
          <a href="#top" onClick={handleScroll} style={{ cursor: "pointer" }}>
            <ArrowUpCircleIcon
              style={{
                margin: "2px 64px 0 64px",
                color: "#fff",
                height: "38px",
                width: "38px",
              }}
              aria-hidden="true"
            />
          </a>
          <a
            href="https://github.com/joseph-s-foster/Would-You-Rather"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="./github.png"
              alt="github logo"
              style={{ margin: "0 4px 0 4px", height: "30px", width: "30px" }}
            />
          </a>
        </div>
        <div>
          <p style={{ marginBottom: "48px", color: "#d9e9e8" }}>
            Copyright &copy; 2024 Would You Rather
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
