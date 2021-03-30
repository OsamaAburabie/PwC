import axios from "axios";
import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import "./Home.css";
function Home() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { isLoggedIn, myToken, email } = useContext(AuthContext);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const handleTicket = async (e) => {
    e.preventDefault();
    const tic = {
      title,
      body,
      email,
    };

    axios
      .post("http://localhost:5000/users/addTickets", tic, {
        headers: { "x-auth-token": myToken },
      })
      .then(() => {
        setTitle("");
        setBody("");
        setSuccess("Your ticket is under process ");
      })
      .catch((err) => err.response.data.msg && setError(err.response.data.msg));
  };
  if (isLoggedIn) {
    return (
      <div className="Home__container">
        <div className="pageform">
          <h6>Do you have any complains?</h6>
          <div className="erros">
            <p>{error}</p>
            <p style={{ color: "green" }}>{success}</p>
          </div>
          <form onSubmit={handleTicket}>
            <input
              value={title}
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              value={body}
              type="text"
              placeholder="More details..."
              onChange={(e) => setBody(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    );
  }
  return (
    <div className="Home__container">
      <p>you should be logged in to send complains</p>
    </div>
  );
}

export default Home;
