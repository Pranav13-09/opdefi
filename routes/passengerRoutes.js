const express = require("express")
const router = express.Router();
const {addPassenger} = require("../controllers/passengerController")

router.route("/addPassenger").post(addPassenger)

module.exports = router;