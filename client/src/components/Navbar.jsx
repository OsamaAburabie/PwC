import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
function Navbar() {
  const { isLoggedIn, role } = useContext(AuthContext);

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
    </div>
  );
}

export default Navbar;
