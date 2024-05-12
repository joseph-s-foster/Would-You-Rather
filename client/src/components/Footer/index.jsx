import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
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
        <a
          href="https://github.com/joseph-s-foster/Would-You-Rather"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="./github.png"
            alt="github logo"
            style={{ height: "24px", width: "24px" }}
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
