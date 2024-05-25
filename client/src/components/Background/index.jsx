import React from "react";
import "../../../src/App.css";
import caret from "../../assets/caret.svg";

const handleScroll = (event) => {
  event.preventDefault();

  const projectsContainer = document.getElementById("Polls");
  if (projectsContainer) {
    projectsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const Background = () => {
  return (
    <div>
    <div className="background">
      <h2 className="cta">Voice Your Choice</h2>
      <div className="scroll">
      <a href="#Polls" onClick={handleScroll}>
        <img className="caret" src={caret} alt="Caret" />
      </a>
      </div>
      </div>
    </div>
  );
};

export default Background;