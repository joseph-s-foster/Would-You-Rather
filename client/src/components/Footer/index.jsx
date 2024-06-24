import { useLocation, useNavigate } from "react-router-dom";
import { ArrowUpCircleIcon, HomeModernIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer>
      <div className="container text-center mb-5">
        {/* <h4 style={{ color: "#FFF" }}>
          Made with{" "}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{" "}
          by Group1
        </h4> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "48px 0 48px 0",
          }}
        >
          <a style={{ cursor: "pointer" }}>
            <HomeModernIcon
              style={{
                margin: "2px 0 0 0",
                color: "fff",
                height: "48px",
                width: "48px",
              }}
              aria-hidden="true"
            />
          </a>
          <a style={{ cursor: "pointer" }}>
            <ArrowUpCircleIcon
              style={{
                margin: "2px 48px 0 48px",
                color: "fff",
                height: "54px",
                width: "54px",
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
              style={{ margin: "2px 5px 0 5px", height: "43px", width: "43px" }}
            />
          </a>
        </div>
        <p style={{ marginBottom: "48px", color: "#d9e9e8" }}>
          Copyright &copy; 2024 Would You Rather
        </p>
      </div>
    </footer>
  );
};

export default Footer;
