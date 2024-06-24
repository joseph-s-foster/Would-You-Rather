import { useLocation, useNavigate } from "react-router-dom";

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
        <a
          href="https://github.com/joseph-s-foster/Would-You-Rather"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="./github.png"
            alt="github logo"
            style={{ margin: "48px", height: "40px", width: "40px" }}
          />
        </a>
        <p style={{ color: "#d9e9e8"}}>Copyright &copy; 2024 Would You Rather</p>
      </div>
    </footer>
  );
};

export default Footer;
