import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER, LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Login = () => {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [login, { error: loginError, data: loginData }] = useMutation(LOGIN_USER);
  const [signup, { error: signupError, data: signupData }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event, mutation) => {
    event.preventDefault();
    try {
      console.log("Form State:", formState);

      const { data } = await mutation({
        variables: { ...formState },
      });

      console.log("Mutation Data:", data);

      if (mutation === signup) {
        Auth.login(data.addUser.token);
      } else {
        Auth.login(data.login.token);
      }
    } catch (e) {
      console.error("Mutation Error:", e);
    }

    // Clear form values
    setFormState({
      username: "",
      password: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-4 col-md-6 col-sm-6">
        <div className="card bg-black" style={{borderRadius: "4px", marginTop: "33%"}}>
          <h2 className="card-header bg-black text-light text-center">Welcome</h2>
          <div className="card-body bg-black text-light">
            {(loginData || signupData) ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form>
                <input
                  className="form-input bg-black"
                  placeholder="Username"
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleInputChange}
                />
                <input
                  className="form-input bg-black"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleInputChange}
                />
                <div className="flex-row justify-space-between">
                  <button
                    className="btn btn-lg btn-primary py-3 mb-2"
                    style={{ cursor: "pointer", flex: "1", marginRight: "4px" }}
                    onClick={(event) => handleFormSubmit(event, login)}
                  >
                    Login
                  </button>
                  <button
                    className="btn btn-lg btn-primary py-3 mb-2"
                    style={{ cursor: "pointer", flex: "1", marginLeft: "4px" }}
                    onClick={(event) => handleFormSubmit(event, signup)}
                  >
                    Signup
                  </button>
                </div>
              </form>
            )}

            {(loginError || signupError) && (
              <div className="my-3 p-3 bg-primary text-white">
                {(loginError && loginError.message) ||
                  (signupError && signupError.message)}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
