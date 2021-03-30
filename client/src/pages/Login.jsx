import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router";
function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { isLoggedIn, checkLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
    //eslint-disable-next-line
  }, [isLoggedIn]);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };

      const loginRes = await axios.post(
        "http://localhost:9000/users/login",
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
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  } else {
    return <></>;
  }
}

export default Login;
