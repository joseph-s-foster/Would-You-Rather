import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Auth from "../../utils/auth.js";
import { useMutation } from "@apollo/client";
import {
  VOTE_ON_POLL_MUTATION,
  DELETE_POLL_MUTATION,
  EDIT_POLL_MUTATION,
} from "../../utils/mutations.js";
import { QUERYME } from "../../utils/queries.js";

function PollCard({ poll }) {
  // switch is editing to (false) after testing
  const [isEditing, setIsEditing] = useState(false);
  const [editedFields, setEditedFields] = useState({
    title: poll.title,
    thisPoll: poll.thisPoll,
    thatPoll: poll.thatPoll,
  });
  const [userId, setUserId] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const loggedIn = Auth.loggedIn();
  const [vote, { error }] = useMutation(VOTE_ON_POLL_MUTATION, {
    refetchQueries: [QUERYME, "queryMe"],
  });
  const [deletePoll] = useMutation(DELETE_POLL_MUTATION, {
    refetchQueries: [QUERYME, "queryMe"],
  });
  const [editPoll] = useMutation(EDIT_POLL_MUTATION, {
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

  const handleEdit = async () => {
    try {
      await editPoll({
        variables: {
          pollId: poll.id,
          title: editedFields.title,
        },
      });
      setIsEdited(true);
      setIsEditing(false); // Exit edit mode after successful edit
      console.log(poll);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    // Reset the editedFields to the original values
    setEditedFields({
      title: poll.title || "Poll Title",
      thisPoll: poll.thisPoll || "",
      thatPoll: poll.thatPoll || "",
    });
    setIsEditing(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);
    setEditedFields({ ...editedFields, [name]: value });
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
    // background: "#000",
    display: "flex",
    flexDirection: "column",
    width: "320px",
    height: "160px",
    // border: "1px solid #e64c66",
    borderRadius: "4px",
    backgroundColor: "#000",
    margin: "4px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const titleStyle = {
    color: "#d9e9e8",
    fontSize: "1.5rem",
    // background: "#000",
    position: "relative",
    padding: "8px",
    // borderBottom: "1px solid #e64c66",
    textAlign: "center",
    fontWeight: "bold",
  };

  const editButtonStyle = {
    background: "#000",
    position: "absolute",
    top: "6px",
    left: "1px",
    border: "none",
    cursor: "pointer",
  };

  const input = {
    color: "white",
    background: "black",
  };

  const deleteButtonStyle = {
    background: "#000",
    position: "absolute",
    top: "4px",
    right: "1px",
    border: "none",
    cursor: "pointer",
  };

  const buttonContainerStyle = {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  };

  const buttonStyle = {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: "4px",
    cursor: "pointer",
    borderRadius: "2px",
    width: "97%",
  };

  const button1 = {
    ...buttonStyle,
    backgroundColor: "#2d3e50",
  };

  const button2 = {
    ...buttonStyle,
    backgroundColor: "#d9e9e8",
  };

  const isCreator = poll.users;

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={titleStyle}>
          {isEditing ? (
            // Render input fields when in edit mode
            <>
              <input
                style={input}
                type="text"
                name="title"
                value={editedFields.title}
                onChange={handleChange}
              />
              {/* Add similar input fields for thisPoll and thatPoll */}
            </>
          ) : (
            // Render title when not in edit mode
            poll.title || "Poll Title"
          )}
          {loggedIn && isCreator && (
            <>
              {isEditing ? (
                // Render save and cancel buttons when in edit mode
                <>
                  <button onClick={handleEdit}>
                    {" "}
                    <img
                      src={"/save.svg"}
                      alt="save"
                      style={{ width: "18px", height: "18px" }}
                    />
                  </button>
                  <button onClick={handleCancelEdit}>   <img
                      src={"/x-circle.svg"}
                      alt="cancel"
                      style={{ width: "18px", height: "18px" }}
                    /></button>
                </>
              ) : (
                // Render edit and delete buttons when not in edit mode
                <>
                  <button
                    style={editButtonStyle}
                    onClick={() => setIsEditing(true)}
                  >
                    <img
                      src={"/pencil.svg"}
                      alt="Edit"
                      style={{ width: "18px", height: "18px" }}
                    />
                  </button>
                  <button style={deleteButtonStyle} onClick={handleDelete}>
                    <img
                      src={"/trash.svg"}
                      alt="Delete"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </button>
                </>
              )}
            </>
          )}
        </div>
        <div style={buttonContainerStyle}>
          <div style={button1}>
            <button
              disabled={!loggedIn}
              onClick={() => handleVote("Option1")}
              value="Option1"
              style={{
                width: "100%",
                // height: "32px",
                color: "#fff",
                background: "none",
                // paddingTop: "12px",
              }}
            >
              {" "}
              {poll.thisPoll}
              <p>{poll.voteOption1}</p>
            </button>
          </div>
          <div style={button2}>
            <button
              disabled={!loggedIn}
              onClick={() => handleVote("Option2")}
              value="Option2"
              style={{
                width: "100%",
                // height: "32px",
                color: "#1a1a1a",
                background: "none",
                // paddingTop: "12px",
              }}
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
