import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router";
function Dashboard() {
  const { isLoggedIn, role } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (role !== "admin" || isLoggedIn === false) {
      history.push("/");
    }
    //eslint-disable-next-line
  }, [isLoggedIn]);
  if (role !== "admin") {
    return <></>;
  } else {
    return <div>Dashboard</div>;
  }
}

export default Dashboard;
