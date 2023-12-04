import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { CREATE_POLL } from "../../utils/mutations";
import { QUERY_THOUGHTS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const ThoughtForm = () => {
  const [title, setTitle] = useState("");
  const [thisPoll, setThisPoll] = useState("");
  const [thatPoll, setThatPoll] = useState("");

  const [characterCount, setCharacterCount] = useState(0);

  const [createPoll, { error }] = useMutation(CREATE_POLL, {
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createPoll({
        variables: {
           title,
           thisPoll,
          thatPoll,
        Auth.getProfile().data.username,
        },
      });

      // Reset form fields
      setTitle("");
      setThisPoll("");
      setThatPoll("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update state based on input name
    if (name === "thoughtTitle" && value.length <= 48) {
      setTitle(value);
    } else if (name === "thoughtThis" && value.length <= 24) {
      setThisPoll(value);
    } else if (name === "thoughtThat" && value.length <= 24) {
      setThatPoll(value);
    }

    // Calculate total character count
    setCharacterCount(
      title.length + thisPoll.length + thatPoll.length
    );
  };

  const isSubmitDisabled = !title || !thisPoll || !thatPoll;

  return (
    <div>
      <h3>Create poll</h3>

      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12">
              <input
                type="text"
                name="thoughtTitle"
                placeholder="Title"
                value={title}
                className="form-input w-100"
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <input
                type="text"
                name="thoughtThis"
                placeholder="Ex: Apple"
                value={thisPoll}
                className="form-input w-100"
                onChange={handleChange}
              ></input>
            </div>
            <div className="col-12">
              <input
                type="text"
                name="thoughtThat"
                placeholder="Ex: Android"
                value={thatPoll}
                className="form-input w-100"
                onChange={handleChange}
              ></input>
            </div>

            <div className="col-12">
              <button
                className="btn btn-primary btn-block py-3"
                type="submit"
                disabled={isSubmitDisabled}
              >
                Submit
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          {" "}
          <Link to="/login">Login / Signup </Link>
          to create polls, view data, or submit votes.
        </p>
      )}
    </div>
  );
};

export default ThoughtForm;
