 
import {
  fetchWaterData,
  calculateWaterRiskIndex,
  classifyWaterRiskLevel,
} from "../utils/waterRisk.js";

// -------------------------------------------
// Controller: Get Water Risk
// -------------------------------------------
export const getWaterRisk = async (req, res) => {
  try {
    const { lat, lng, date } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    // Fetch raw water data (e.g., water stress, scarcity indicators, precipitation)
    const waterData = await fetchWaterData(lat, lng, date);

    if (!waterData) {
      return res.status(500).json({ error: "Failed to fetch water data" });
    }

    // Example: extract precipitation and groundwater index
    const precipitation = waterData.precipitation || 0;
    const groundwater = waterData.groundwater || 0;

    // Calculate Water Risk Index
    const wrIndex = calculateWaterRiskIndex(precipitation, groundwater);

    // Classify risk level
    const riskLevel = classifyWaterRiskLevel(wrIndex);

    res.json({
      location: { lat, lng },
      precipitation,
      groundwater,
      waterRiskIndex: wrIndex,
      riskLevel,
    });
  } catch (err) {
    console.error("Error in getWaterRisk:", err.message);
    res.status(500).json({ error: "Server error calculating water risk" });
  }
};
