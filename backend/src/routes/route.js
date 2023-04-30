const express = require("express");
const router = express.Router();

const { createUser } = require("../controllers/userController");
const {
  createItinerary,
  getItinerary,
  updateItinerary,
  deleteItinerary,
} = require("../controllers/intineraryController");

//User
router.post("/createUser", createUser);

//Intinerary
router.post("/createItinerary", createItinerary);
router.get("/getItinerary/:id", getItinerary);
router.put("/updateItinerary/:id", updateItinerary);

router.delete("/deleteItinerary/:id", deleteItinerary);
module.exports = router;
