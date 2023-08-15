const express = require("express")
const router = express.Router();
const {addFlight,getAllFlights,getPassengerFlights} = require("../controllers/flightController")

router.route("/addFlight").post(addFlight)
router.route("/getAllFlights").get(getAllFlights)
router.route("/getPassengerFlight").get(getPassengerFlights)

module.exports = router;