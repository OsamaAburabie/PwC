import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
function Navbar() {
  const { isLoggedIn, role } = useContext(AuthContext);

  const logout = async () => {
    localStorage.setItem("auth-token", "");
    window.location = "/login";
  };
  return (
    <div>
      <Link to="/">Home</Link>
      {isLoggedIn === false && (
        <>
          <Link to="/login">login</Link>
          <Link to="/register">register</Link>
          <Link to="/admin/register">Adminregister</Link>
        </>
      )}
      {role === "admin" && <Link to="/admin/dashboard">dashboard</Link>}
      {isLoggedIn === true && <button onClick={logout}>LogOut</button>}
    </div>
  );
}

export default Navbar;
