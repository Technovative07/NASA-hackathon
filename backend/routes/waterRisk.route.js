 
import fs from "fs";
import path from "path";
import axios from "axios";

// -------------------------------------------
// Load local water dataset (processed JSON)
// -------------------------------------------
export const loadWaterRiskData = (filename = "water_risk_data.json") => {
  try {
    const filePath = path.join(process.cwd(), "backend", "data", filename);
    if (!fs.existsSync(filePath)) return null;

    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
  } catch (err) {
    console.error("Error loading water risk dataset:", err.message);
    return null;
  }
};

// -------------------------------------------
// Fetch precipitation data (NASA POWER / GPM)
// -------------------------------------------
export const fetchPrecipitationData = async (lat, lng, start, end) => {
  try {
    const url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=PRECTOT&community=RE&longitude=${lng}&latitude=${lat}&start=${start}&end=${end}&format=JSON`;

    const response = await axios.get(url);
    const data = response.data.properties.parameter.PRECTOT;
    return data; // {date: precipitation in mm/day}
  } catch (err) {
    console.error("Error fetching precipitation data:", err.message);
    return null;
  }
};

// -------------------------------------------
// Fetch soil moisture data (NASA SMAP)
// Example endpoint (replace with real API/DB)
// -------------------------------------------
export const fetchSoilMoistureData = async (lat, lng) => {
  try {
    // Placeholder API (you would connect to NASA SMAP data service or Copernicus)
    const url = `https://api.agromonitoring.com/agro/1.0/soil?polyid=${lat},${lng}&appid=${process.env.AGRO_API_KEY}`;
    const response = await axios.get(url);
    return response.data; // soil moisture values
  } catch (err) {
    console.error("Error fetching soil moisture data:", err.message);
    return null;
  }
};

// -------------------------------------------
// Simple Water Risk Index Calculation
// WR index = precipitation deficit + low soil moisture
// -------------------------------------------
export const calculateWaterRiskIndex = (precip, soilMoisture
)