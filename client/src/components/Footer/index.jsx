import { useLocation, useNavigate } from "react-router-dom";
import { ArrowUpCircleIcon, HomeModernIcon } from "@heroicons/react/24/solid";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScroll = (event) => {
    event.preventDefault();

    const topContainer = document.getElementById("top");
    if (topContainer) {
      topContainer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer>
      <div className="container text-center mb-5">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "48px 0 48px 0",
          }}
        >
          <a href="./" style={{ cursor: "pointer" }}>
            <HomeModernIcon
              style={{
                margin: "4px 4px 0 0",
                color: "fff",
                height: "40px",
                width: "40px",
              }}
              aria-hidden="true"
            />
          </a>
          <a href="#top" onClick={handleScroll} style={{ cursor: "pointer" }}>
            <ArrowUpCircleIcon
              style={{
                margin: "2 64px 0 64px",
                color: "fff",
                height: "46px",
                width: "46px",
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
              style={{ margin: "0 4px 0 4px", height: "37px", width: "37px" }}
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
