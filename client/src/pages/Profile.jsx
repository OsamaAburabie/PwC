import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import "./Profile.css";
import { useHistory } from "react-router";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import axios from "axios";
function Profile() {
  const { isLoggedIn, myToken, username, email } = useContext(AuthContext);
  const [tickets, setTickets] = useState();
  console.log(myToken);
  const history = useHistory();

  async function fetchData() {
    await axios
      .get("http://localhost:5000/users/allTickets", {
        headers: { "x-auth-token": myToken },
      })
      .then((req) => {
        setTickets(req.data);
      });
  }
  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/");
    } else {
      fetchData();
    }
    //eslint-disable-next-line
  }, [isLoggedIn]);

  //deleting tickets
  const deleteTicket = (id) => {
    const headers = {
      "x-auth-token": myToken,
    };
    axios
      .delete("http://localhost:5000/users/allTickets/" + id, { headers })
      .then(setTickets(tickets.filter((todo) => todo._id !== id)));
  };
  if (!isLoggedIn) {
    return <></>;
  } else {
    return (
      <div className="Profile__container">
        <div className="side__bar">
          {/* <NavLink to="profile">
            <button className="sbar__btn black">My Tickets</button>
          </NavLink> */}
          <div className="userData">
            <p>
              <PersonIcon /> Name: {username}
            </p>
            <p>
              {" "}
              <EmailIcon /> Email: {email}
            </p>
          </div>
          <button className="sbar__btn ">Delete Account</button>
        </div>
        <div className="Prifile__content">
          <table className="zebra">
            <thead>
              <tr>
                <th>Title</th>
                <th>Body</th>
                <th>Date Created</th>
                <th>Email</th>
                <th>Status</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {tickets &&
                tickets.map((el) => (
                  <tr key={el._id}>
                    <td>{el.title}</td>
                    <td>{el.body}</td>
                    <td>{el.createdAt}</td>
                    <td>{el.email}</td>
                    <td>{el.status}</td>
                    <td>
                      <button
                        onClick={() => deleteTicket(el._id)}
                        className="btn__del"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Profile;
