import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Polls from "../Polls.jsx";
import { CREATE_POLL } from "../../utils/mutations";

import Auth from "../../utils/auth";

const PollForm = () => {
  const [title, setTitle] = useState("");
  const [thisPoll, setThisPoll] = useState("");
  const [thatPoll, setThatPoll] = useState("");
  const [error, setError] = useState(null);

  const [characterCount, setCharacterCount] = useState(0);

  const [createPoll, { error: mutationError }] = useMutation(CREATE_POLL);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createPoll({
        variables: {
          title,
          thisPoll,
          thatPoll,
        },
      });

      // Reset form fields
      setTitle("");
      setThisPoll("");
      setThatPoll("");
      document.location.reload();
    } catch (err) {
      console.error(err.message);

      // Check if it's a duplicate key violation error
      if (err.message.includes("duplicate key error")) {
        const errorMessage = "This poll already exists.";
        setError(errorMessage);
        console.error(errorMessage); // Log the error for further debugging if needed
      } else {
        const errorMessage = "An error occurred while creating the card.";
        setError(errorMessage);
        console.error(errorMessage); // Log the error for further debugging if needed
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update state based on input name
    if (name === "title" && value.length <= 24) {
      setTitle(value);
    } else if (name === "thisPoll" && value.length <= 16) {
      setThisPoll(value);
    } else if (name === "thatPoll" && value.length <= 16) {
      setThatPoll(value);
    }

    // Calculate total character count
    setCharacterCount(title.length + thisPoll.length + thatPoll.length);
  };

  const isSubmitDisabled = !title || !thisPoll || !thatPoll;

  return (
    <div>
      {Auth.loggedIn() && (
        <>
          <form className="col-lg-6" onSubmit={handleFormSubmit}>
            <h3>Create poll</h3>
            <div className="col-12">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                className="form-input w-100"
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <input
                type="text"
                name="thisPoll"
                placeholder="Ex: Apple"
                value={thisPoll}
                className="form-input w-100"
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <input
                type="text"
                name="thatPoll"
                placeholder="Ex: Android"
                value={thatPoll}
                className="form-input w-100"
                onChange={handleChange}
              ></input>
            </div>
  
            <div className="col-12">
              <button
                className="btn btn-primary btn-block mt-2 mb-4 py-3"
                type="submit"
                disabled={isSubmitDisabled}
              >
                Submit
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error}
              </div>
            )}
          </form>
          <div>
            <Polls />
          </div>
        </>
      )}
    </div>
  );
}
export default PollForm;
