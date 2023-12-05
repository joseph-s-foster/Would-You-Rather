import { Link } from "react-router-dom";
import React from "react";


function PollCard() {
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    width: "400px",
    height: "300px",
    border: "2px solid #ccc",
    borderRadius: "8px",
    margin: "16px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const titleStyle = {
    padding: "16px",
    borderBottom: "2px solid #ccc",
    textAlign: "center",
    fontWeight: "bold",
  };

  const buttonContainerStyle = {
    display: "flex", // Updated to use flexbox
    flexDirection: "row", // Align children in a row
    flexGrow: 1, // Allow buttons to grow and fill available space
  };

  const buttonStyle = {
    flex: 1,
    margin: "5px",
    cursor: "pointer",
    border: "none",
    borderRadius: "8px",
    width: "100%",
  };
  // Button color style options below
  const buttonStyleBlue = {
    ...buttonStyle,
    backgroundColor: "rgba(173, 216, 230, 0.1)", // Slightly blue background
  };

  const buttonStyleRed = {
    ...buttonStyle,
    backgroundColor: "rgba(255, 0, 0, 0.1)", // Slightly red background
  };

  const buttonStylePurple = {
    ...buttonStyle,
    backgroundColor: "rgba(128, 0, 128, 0.1)", // Slightly purple background
  };

  const buttonStyleGreen = {
    ...buttonStyle,
    backgroundColor: "rgba(34, 200, 34, 0.1)", // Slightly green background
  };

  return (
    <div style={cardStyle}>
      <div style={titleStyle}> Poll Title
        {/* { {title ? title : "Poll Title"}} */}
        </div>
      <div style={buttonContainerStyle}>
        <div style={buttonStyleBlue}>
          <button style={{ width: "100%", height: "100%", background: "none" }}>
            {" "}
            Poll choice 1
            {/* {thisPoll ? thisPoll : "Poll Choice 1"} */}
          </button>
        </div>
        <div style={buttonStyleGreen}>
          <button style={{ width: "100%", height: "100%", background: "none" }}>
            Poll choice 2
          </button>
        </div>
      </div>
    </div>
  );
}
export default PollCard;
