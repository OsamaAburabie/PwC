import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router";
import AdminSideBar from "../components/AdminSideBar";
import "./Dashboard.css";
function ManageTickits() {
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
    return (
      <div className="dashboard__container">
        <AdminSideBar />
        <div className="dashboard__content"></div>
      </div>
    );
  }
}

export default ManageTickits;
