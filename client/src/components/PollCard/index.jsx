import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Auth from "../../utils/auth.js";
import { useMutation } from "@apollo/client";
import { VOTE_ON_POLL_MUTATION, DELETE_POLL_MUTATION } from "../../utils/mutations.js";
import { QUERYME } from "../../utils/queries.js";

function PollCard({ poll }) {
  const [userId, setUserId] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const loggedIn = Auth.loggedIn();
  const [vote, { error }] = useMutation(VOTE_ON_POLL_MUTATION, {
    refetchQueries: [QUERYME, "queryMe"],
  });
  const [deletePoll] = useMutation(DELETE_POLL_MUTATION, {
    refetchQueries: [QUERYME, "queryMe"],
  });

  useEffect(() => {
    if (loggedIn) {
      setUserId(Auth.getProfile().data._id);
    }
  }, [loggedIn]);

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

  const handleDelete = async () => {
    try {
      await deletePoll({
        variables: { pollId: poll.id },
      });
      setIsDeleted(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (isDeleted) {
    return null; // Do not render the component if the poll is deleted
  }

  const containerStyle = {
    display: "flex",
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
    backgroundColor: "#FFF",
    margin: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const titleStyle = {
    position: "relative",
    padding: "8px",
    borderBottom: "2px solid #ccc",
    backgroundColor: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  };

  const editButtonStyle = {
    position: "absolute",
    top: "6px",
    left: "1px",
    border: "none",
    cursor: "pointer",
  };

  const deleteButtonStyle = {
    position: "absolute",
    top: "4px",
    right: "1px",
    border: "none",
    cursor: "pointer",
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

  const buttonStyleBlue = {
    ...buttonStyle,
    backgroundColor: "rgba(173, 216, 230, 0.1)",
  };

  const buttonStyleGreen = {
    ...buttonStyle,
    backgroundColor: "rgba(34, 200, 34, 0.1)", // Slightly green background
  };

  const isCreator = poll.users;

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={titleStyle}>
          {poll.title || "Poll Title"}
          {loggedIn && isCreator && (
            <>
              <button
                style={editButtonStyle}
                // onClick={() => /* handle the click event here */}
              >
                <img
                  src={"src/assets/pencil.svg"}
                  alt="Edit"
                  style={{ width: "18px", height: "18px" }}
                />
              </button>
              <button
                style={deleteButtonStyle}
                onClick={handleDelete}
              >
                <img
                  src={"src/assets/trash.svg"}
                  alt="Delete"
                  style={{ width: "20px", height: "20px" }}
                />
              </button>
            </>
          )}
        </div>
        <div style={buttonContainerStyle}>
          <div style={buttonStyleBlue}>
            <button
              disabled={!loggedIn}
              onClick={() => handleVote("Option1")}
              value="Option1"
              style={{ width: "100%", height: "100%", background: "none"}}
            >
              {" "}
              {poll.thisPoll}
              <p>{poll.voteOption1}</p>
            </button>
          </div>
          <div style={buttonStyleGreen}>
            <button
              disabled={!loggedIn}
              onClick={() => handleVote("Option2")}
              value="Option2"
              style={{ width: "100%", height: "100%", background: "none"}}
            >
              {poll.thatPoll}
              <p>{poll.voteOption2}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PollCard;
