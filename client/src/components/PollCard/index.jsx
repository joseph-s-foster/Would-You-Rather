import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Auth from "../../utils/auth.js";
import { useMutation } from "@apollo/client";
import { VOTE_ON_POLL_MUTATION } from "../../utils/mutations.js";

function PollCard({ poll }) {
  const [userId, setUserId] = useState(null);
  const loggedIn = Auth.loggedIn();
  const [vote, { error }] = useMutation(VOTE_ON_POLL_MUTATION);

  useEffect(() => {
    if (loggedIn) {
      setUserId(Auth.getProfile().data._id);
    }
  }, [loggedIn]);

  const handleVote = async (e) => {
    const option = e.target.value;
    const { data } = await vote({
      variables: {
        pollId: poll.id,
        option: option,
        userId: userId,
      },
    });
    console.log(data);
  };
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    width: "350px",
    height: "200px",
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
      <div style={titleStyle}> {poll.title || "Poll Title"}</div>
      <div style={buttonContainerStyle}>
        <div style={buttonStyleBlue}>
          <button
            disabled={!loggedIn}
            onClick={handleVote}
            value="Option1"
            style={{ width: "100%", height: "100%", background: "none" }}
          >
            {" "}
            {poll.thisPoll}
            <p>{poll.voteOption1}</p>
          </button>
        </div>
        <div style={buttonStyleGreen}>
          <button
            disabled={!loggedIn}
            onClick={handleVote}
            value="Option2"
            style={{ width: "100%", height: "100%", background: "none" }}
          >
            {poll.thatPoll}
            <p>{poll.voteOption2}</p>
          </button>
        </div>
      </div>
    </div>
  );
}
export default PollCard;
