 
import {
  fetchLandSurfaceTemp,
  calculateHeatIslandIndex,
  classifyHeatIslandRisk,
} from "../utils/heatIsland.js";

// -------------------------------------------
// Controller: Get Heat Island Risk
// -------------------------------------------
export const getHeatIslandRisk = async (req, res) => {
  try {
    const { lat, lng, date } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    // Fetch land surface temperature
    const lstData = await fetchLandSurfaceTemp(lat, lng, date);

    if (!lstData) {
      return res.status(500).json({ error: "Failed to fetch LST data" });
    }

    // Example: Use the average LST value
    const avgTemp =
      Array.isArray(lstData) && lstData.length > 0
        ? lstData.reduce((a, b) => a + b, 0) / lstData.length
        : lstData.value || 0;

    // Calculate Heat Island Index
    const hiIndex = calculateHeatIslandIndex(avgTemp);

    // Classify risk level
    const riskLevel = classifyHeatIslandRisk(hiIndex);

    res.json({
      location: { lat, lng },
      averageTemperature: avgTemp,
      heatIslandIndex: hiIndex,
      riskLevel,
    });
  } catch (err) {
    console.error("Error in getHeatIslandRisk:", err.message);
    res.status(500).json({ error: "Server error calculating heat island risk" });
  }
};
