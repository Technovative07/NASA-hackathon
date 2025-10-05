
import fs from "fs";
import path from "path";
import axios from "axios";

// -------------------------------------------
// Load local UHI dataset (processed JSON)
// -------------------------------------------
export const loadHeatIslandData = (filename = "heat_island_data.json") => {
  try {
    const filePath = path.join(process.cwd(), "backend", "data", filename);
    if (!fs.existsSync(filePath)) return null;

    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
  } catch (err) {
    console.error("Error loading heat island dataset:", err.message);
    return null;
  }
};

// -------------------------------------------
// Fetch satellite-based surface temperature
// Example: NASA POWER or Open-Meteo API
// -------------------------------------------
export const fetchSurfaceTemperature = async (lat, lng, start, end) => {
  try {
    const url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M_MAX&community=RE&longitude=${lng}&latitude=${lat}&start=${start}&end=${end}&format=JSON`;

    const response = await axios.get(url);
    const data = response.data.properties.parameter.T2M_MAX;
    return data; // returns {date: temperature}
  } catch (err) {
    console.error("Error fetching surface temperature:", err.message);
    return null;
  }
};

// -------------------------------------------
// Simple Heat Island Index Calculation
// UHI index = (Urban Temp - Rural Temp)
// -------------------------------------------
export const calculateHeatIslandIndex = (urbanTemp, ruralTemp) => {
  if (urbanTemp == null || ruralTemp == null) return null;
  return urbanTemp - ruralTemp;
};

// -------------------------------------------
// Predict risk level of heat island effect
// -------------------------------------------
export const classifyHeatIslandRisk = (uhiIndex) => {
  if (uhiIndex < 1) return "Low";
  if (uhiIndex < 3) return "Moderate";
  return "High";
};
