
import fs from "fs";
import path from "path";

// ------------------------------
// Utility: Load Processed Data
// ------------------------------
const loadProcessedData = (fileName) => {
  try {
    const filePath = path.join(
      process.cwd(),
      "backend",
      "data",
      fileName
    );

    if (!fs.existsSync(filePath)) {
      console.error(`Data file not found: ${filePath}`);
      return null;
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error loading processed data:", err.message);
    return null;
  }
};

// ------------------------------
// Utility: Save Processed Data
// ------------------------------
const saveProcessedData = (fileName, data) => {
  try {
    const dirPath = path.join(process.cwd(), "backend", "data");

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

    console.log(`✅ Data saved to ${filePath}`);
    return true;
  } catch (err) {
    console.error("Error saving processed data:", err.message);
    return false;
  }
};

export default { loadProcessedData, saveProcessedData }