import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router";
function Register() {
  const [email, setEmail] = useState();
  const [displayName, setDisplayName] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const { isLoggedIn, checkLoggedIn } = useContext(AuthContext);
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
      const loginData = {
        email,
        password,
        passwordCheck,
        displayName,
      };

      const loginRes = await axios.post(
        "http://localhost:9000/users/register",
        loginData
      );
      if (loginRes.data.token) {
        localStorage.setItem("auth-token", loginRes.data.token);
        checkLoggedIn();
      }
      // history.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  if (isLoggedIn === false) {
    return (
      <div>
        <h1>Register A new account</h1>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="displayName"
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            type="text"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="password passwordCheck"
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  } else {
    return <></>;
  }
}

export default Register;
