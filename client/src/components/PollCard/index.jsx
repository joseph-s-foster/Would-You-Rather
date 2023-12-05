import React, { useState } from "react";
import { Link } from "react-router-dom";

function PollCard() {
  // State variables to track voting status and counts
  const [userVoted, setUserVoted] = useState(false);
  const [voteCountOption1, setVoteCountOption1] = useState(0);
  const [voteCountOption2, setVoteCountOption2] = useState(0);

  // Function to handle user votes
  const handleVote = (option) => {
    // Check if the user hasn't voted yet
    if (!userVoted) {
      // Mark the user as voted
      setUserVoted(true);

      // Increment the vote count for the selected option
      if (option === "option1") {
        setVoteCountOption1(voteCountOption1 + 1);
      } else if (option === "option2") {
        setVoteCountOption2(voteCountOption2 + 1);
      }
    }
  };

  // Styles for the poll card
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
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  };

  const buttonStyle = {
    flex: 1,
    margin: "5px",
    cursor: "pointer",
    border: "none",
    borderRadius: "8px",
    width: "100%",
  };

  // Button color style options
  const buttonStyleBlue = {
    ...buttonStyle,
    backgroundColor: "rgba(173, 216, 230, 0.1)",
  };

  const buttonStyleGreen = {
    ...buttonStyle,
    backgroundColor: "rgba(34, 200, 34, 0.1)",
  };

  // Render the poll card component
  return (
    <div style={cardStyle}>
      <div style={titleStyle}>Pets</div>
      <div style={buttonContainerStyle}>
        {/* Option 1 button */}
        <div style={buttonStyleBlue} onClick={() => handleVote("option1")}>
          <button style={{ width: "100%", height: "100%", background: "none" }}>
            Cats<br />Votes: {voteCountOption1}
          </button>
        </div>
        {/* Option 2 button */}
        <div style={buttonStyleGreen} onClick={() => handleVote("option2")}>
          <button style={{ width: "100%", height: "100%", background: "none" }}>
            Dogs<br />Votes: {voteCountOption2}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PollCard;
