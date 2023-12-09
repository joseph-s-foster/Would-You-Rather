import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Auth from "../../utils/auth.js";
import { useMutation } from "@apollo/client";
import { VOTE_ON_POLL_MUTATION, DELETE_POLL_MUTATION } from "../../utils/mutations.js";
import { GET_POLLS_QUERY, QUERYME } from "../../utils/queries.js";

function PollCard({ poll }) {
  const [userId, setUserId] = useState(null);
  const loggedIn = Auth.loggedIn();
  const [vote, { error }] = useMutation(VOTE_ON_POLL_MUTATION, {
    refetchQueries: [QUERYME, "queryMe"],
  });

  useEffect(() => {
    if (loggedIn) {
      setUserId(Auth.getProfile().data._id);
    }
  }, [loggedIn]);

  const [deletePoll, { error: deleteError }] = useMutation(DELETE_POLL_MUTATION, {
    refetchQueries: [
      { query: QUERYME },
      { query: GET_POLLS_QUERY },
    ],
  });

  const handleVote = async (option) => {
    try {
      const { data } = await vote({
        variables: {
          pollId: poll.id,
          option: option,
          userId: userId,
        },
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePoll = async (pollId) => {
    try {
      const { data } = await deletePoll({
        variables: {
          pollId: pollId,
        },
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    width: "320px",
    height: "144px",
    border: "2px solid #ccc",
    borderRadius: "4px",
    margin: "16px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const titleStyle = {
    padding: "8px",
    borderBottom: "2px solid #ccc",
    textAlign: "center",
    fontWeight: "bold",
  };

  const buttonContainerStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
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

  const buttonStyleBlue = {
    ...buttonStyle,
    backgroundColor: "rgba(173, 216, 230, 0.1)",
  };

  const buttonStyleGreen = {
    ...buttonStyle,
    backgroundColor: "rgba(34, 200, 34, 0.1)",
  };

  const deleteButtonStyle = {
    width: "100%",
    height: "40px",
    background: "none",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginTop: "8px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={titleStyle}>{poll.title || "Poll Title"}</div>
        <div style={buttonContainerStyle}>
          <div style={buttonStyleBlue}>
            <button
              disabled={!loggedIn}
              onClick={() => handleVote("Option1")}
              value="Option1"
              style={{ width: "100%", height: "100%", background: "none" }}
            >
              {poll.thisPoll}
              <p>{poll.voteOption1}</p>
            </button>
          </div>
          <div style={buttonStyleGreen}>
            <button
              disabled={!loggedIn}
              onClick={() => handleVote("Option2")}
              value="Option2"
              style={{ width: "100%", height: "100%", background: "none" }}
            >
              {poll.thatPoll}
              <p>{poll.voteOption2}</p>
            </button>
          </div>
        </div>
        {loggedIn && (
          <button
            style={deleteButtonStyle}
            onClick={() => handleDeletePoll(poll.id)}
          >
            Delete Poll
          </button>
        )}
      </div>
    </div>
  );
}

export default PollCard;