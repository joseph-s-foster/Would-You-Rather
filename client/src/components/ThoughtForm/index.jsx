import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_THOUGHT } from "../../utils/mutations";
import { QUERY_THOUGHTS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const ThoughtForm = () => {
  const [thoughtTitle, setThoughtTitle] = useState("");
  const [thoughtThis, setThoughtThis] = useState("");
  const [thoughtThat, setThoughtThat] = useState("");

  const [characterCount, setCharacterCount] = useState(0);

  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    refetchQueries: [QUERY_THOUGHTS, "getThoughts", QUERY_ME, "me"],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addThought({
        variables: {
          thoughtTitle,
          thoughtThis,
          thoughtThat,
          thoughtAuthor: Auth.getProfile().data.username,
        },
      });

      // Reset form fields
      setThoughtTitle("");
      setThoughtThis("");
      setThoughtThat("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update state based on input name
    if (name === "thoughtTitle" && value.length <= 48) {
      setThoughtTitle(value);
    } else if (name === "thoughtThis" && value.length <= 24) {
      setThoughtThis(value);
    } else if (name === "thoughtThat" && value.length <= 24) {
      setThoughtThat(value);
    }

    // Calculate total character count
    setCharacterCount(
      thoughtTitle.length + thoughtThis.length + thoughtThat.length
    );
  };

  const isSubmitDisabled = !thoughtTitle || !thoughtThis || !thoughtThat;

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
                value={thoughtTitle}
                className="form-input w-100"
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <input
                type="text"
                name="thoughtThis"
                placeholder="Ex: Apple"
                value={thoughtThis}
                className="form-input w-100"
                onChange={handleChange}
              ></input>
            </div>
            <div className="col-12">
              <input
                type="text"
                name="thoughtThat"
                placeholder="Ex: Android"
                value={thoughtThat}
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
          <Link to="/login">Login</Link> or <Link to="/signup">Signup </Link>
          to create a poll or cast your vote.
        </p>
      )}
    </div>
  );
};

export default ThoughtForm;
