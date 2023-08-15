const express = require("express")
const router = express.Router();
const {AssignFlight,help} = require("../controllers/AssignmentController")


router.route("/assignFlight").post(AssignFlight)
router.route("/please").get(help)


module.exports = router;