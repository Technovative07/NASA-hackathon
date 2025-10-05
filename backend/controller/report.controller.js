
import { generatePDFReport } from "../utils/report.js";
import { getHeatIsland } from "./heatIslandController.js";
import { getWaterRisk } from "./waterRiskController.js";
import predictAirQuality from "./airQualityController.js";

// -------------------------------------------
// Controller: Generate Combined Environmental Report
// -------------------------------------------
export const generateReport = async (req, res) => {
  try {
    const { lat, lng, date } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    // Collect data from multiple modules
    const [heatIslandData, waterRiskData] = await Promise.all([
      (async () => {
        const mockRes = { json: (data) => data };
        return await getHeatIsland({ query: { lat, lng, date } }, mockRes);
      })(),
      (async () => {
        const mockRes = { json: (data) => data };
        return await getWaterRisk({ query: { lat, lng, date } }, mockRes);
      })(),
    ]);

    // Air quality prediction
    const airQualityData = await new Promise((resolve) => {
      const mockRes = { json: (data) => resolve(data) };
      predictAirQuality({ body: { recentData: null } }, mockRes);
    });

    // Combine into one structured report
    const reportData = {
      location: { lat, lng },
      date: date || new Date().toISOString(),
      heatIsland: heatIslandData,
      waterRisk: waterRiskData,
      airQuality: airQualityData,
    };

    // Generate PDF
    const pdfBuffer = await generatePDFReport(reportData);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=environment_report_${Date.now()}.pdf`
    );
    res.send(pdfBuffer);
  } catch (err) {
    console.error("Error in generateReport:", err.message);
    res.status(500).json({ error: "Failed to generate report" });
  }
};
