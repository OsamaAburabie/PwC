import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
function AuthContextProvider(props) {
  const [isLoggedIn, setLoggedIn] = useState();
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null);

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    }

    const tokenRes = await axios.post(
      "http://localhost:9000/check/isLoggedIn",
      null,
      {
        headers: { "x-auth-token": token },
      }
    );
    if (tokenRes.data.valid === true) {
      setUsername(tokenRes.data.displayName);
      setRole(tokenRes.data.role);
      setEmail(tokenRes.data.email);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, username, role, email, checkLoggedIn }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
