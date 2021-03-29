import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
function AuthContextProvider(props) {
  const [isLoggedIn, setLoggedIn] = useState(undefined);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null);

  const getLoggedin = async () => {
    const loggedinRes = await axios.post(
      "http://localhost:5000/check/isLoggedIn"
    );
    setLoggedIn(loggedinRes.data.valid);
    if (loggedinRes.data.valid === true) {
      setUsername(loggedinRes.data.displayName);
      setRole(loggedinRes.data.role);
      setEmail(loggedinRes.data.email);
    }
  };
  useEffect(() => {
    getLoggedin();
  }, []);
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, getLoggedin, username, role, email }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
