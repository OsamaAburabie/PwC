const router = require("express").Router();
const auth = require("../middleware/auth");
const { user_register, user_login } = require("../controllers/authController");
const {
  add_ticket,
  get_all_tickets,
  get_specific_ticket,
  delete_specific_ticket,
} = require("../controllers/ticketController");

router.post("/register", user_register);

router.post("/login", user_login);

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});
//user Ticket's
router.post("/addTickets", auth, add_ticket);

router.get("/allTickets", auth, get_all_tickets);

router.get("/allTickets/:id", auth, get_specific_ticket);

router.delete("/allTickets/:id", auth, delete_specific_ticket);

module.exports = router;
