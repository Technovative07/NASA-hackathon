
import express from "express";
import predictAirQuality from "../controller/airquality.controller.js";

const router = express.Router();

 
router.get("/", (req, res) => {
  res.json({ message: "Air Quality API is running 🚀" });
});

// Prediction endpoint
router.post("/predict", predictAirQuality);

export default router;

