import axios from "axios";
import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
function StatusSelect({ fetching, status, id }) {
  const [ticketStatus, setTicketStatus] = useState(status);
  const { myToken } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const ChangeStatus = (e) => {
    // setTicketStatus(e.target.value);
    axios
      .put(
        `http://localhost:5000/admins/allTickets/${id}`,
        { status: e.target.value },
        {
          headers: { "x-auth-token": myToken },
        }
      )
      .then((res) => {
        setTicketStatus(res.data);
        setSuccess(true);
      })
      .catch((err) => err.response.data.msg && setError(true));
  };
  return (
    <>
      <select value={ticketStatus} onChange={ChangeStatus}>
        <option value="dismissed">dismissed</option>
        <option value="pending">pending</option>
        <option value="resolved">resolved</option>
      </select>
      {error && <CloseIcon />}
      {success && <CheckIcon />}
    </>
  );
}

export default StatusSelect;
