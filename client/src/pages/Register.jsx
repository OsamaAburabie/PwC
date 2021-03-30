import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router";
import "./Login.css";
function Register() {
  const [email, setEmail] = useState();
  const [displayName, setDisplayName] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const { isLoggedIn, checkLoggedIn } = useContext(AuthContext);
  const [error, setError] = useState();

  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
    //eslint-disable-next-line
  }, [isLoggedIn]);
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const RegisterData = {
        email,
        password,
        passwordCheck,
        displayName,
      };

      const loginRes = await axios.post(
        "http://localhost:5000/users/register",
        RegisterData
      );
      if (loginRes.data.token) {
        localStorage.setItem("auth-token", loginRes.data.token);
        checkLoggedIn();
      }
      // history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  if (!isLoggedIn) {
    return (
      <div className="container">
        <div className="pageform">
          <h6>Register a new account</h6>
          <div className="erros">
            <p>{error}</p>
          </div>
          <form onSubmit={handleRegister}>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default Register;
