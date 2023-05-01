const itineraryModel = require("../models/itinerarayModel");
const userModel = require("../models/userModel");
const axios = require("axios");

exports.createItinerary = async (req, res) => {
  try {
    const data = req.body;

    let userExist = await userModel.findById(data.user);
    if (!userExist) {
      return res.status(404).send({ status: false, message: "user not found" });
    }
    let itineraryExist = await itineraryModel.findOne({ user: data.user });
    if (itineraryExist) {
      return res.status(404).send({
        status: false,
        message: "can't create more than one itinerary for same user",
      });
    }
    let itinerary = await itineraryModel.create(data);
    res.status(201).send({ status: true, data: itinerary });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//get

exports.getItinerary = async (req, res) => {
  try {
    let itinerary = await itineraryModel.findById(req.params.id);
    if (!itinerary) {
      return res
        .status(404)
        .send({ status: false, message: "itinerary not found" });
    }
    res.status(200).send({ status: true, data: itinerary });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//update

exports.updateItinerary = async (req, res) => {
  try {
    let { destination, startDate, endDate, activities, accommodations } =
      req.body;
    let intinerary = await itineraryModel.findById(req.params.id);
    if (!intinerary) {
      return res
        .status(404)
        .send({ status: false, message: "intinerary not found" });
    }
    let updatedItinerary = await itineraryModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        destination: destination,
        startDate: startDate,
        endDate: endDate,
        activities: activities,
        accommodations: accommodations,
      },
      { new: true }
    );
    res.status(200).send({ status: true, data: updatedItinerary });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//Delete

exports.deleteItinerary = async (req, res) => {
  try {
    let intinerary = await itineraryModel.findById(req.params.id);
    if (!intinerary) {
      return res
        .status(404)
        .send({ status: false, message: "intinerary not found" });
    }

    let deletedItinerary = await itineraryModel.findOneAndUpdate(
      { _id: req.params.id },
      { isDeleted: true }
    );

    res.status(204).send();
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

exports.getSuggestedActivitiesAndAccommodations = async (req, res) => {
  try {
    const { destination, startDate, endDate } = req.query;

    const response = await axios.get(
      `https://api.example.com/suggestions?destination=${destination}&startDate=${startDate}&endDate=${endDate}`
    );

    // If the response status is not 200 OK, return an error response
    if (response.status !== 200) {
      return res.status(response.status).send({
        status: false,
        message:
          "Failed to get suggested activities and accommodations from third-party API",
      });
    }

    const { activities, accommodations } = response.data;
  
    res.status(200).send({
      status: true,
      data: {
        activities,
        accommodations,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};
