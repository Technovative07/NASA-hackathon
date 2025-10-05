import { spawn } from 'child_process';
import dataFetcher from '../utils/dataFetcher.js';

// Generate Environmental Report (aggregates AQI, Heat Island, and Water Risk)
export const generateReport = async (req, res) => {
try {
// Load processed datasets
const airQualityData = dataFetcher.loadProcessedData('air_quality_processed.json');
const heatIslandData = dataFetcher.loadProcessedData('heat_island_processed.json');
const waterRiskData = dataFetcher.loadProcessedData('water_risk_processed.json');


if (!airQualityData || !heatIslandData || !waterRiskData) {
  return res.status(500).json({ error: 'Missing one or more datasets for report generation' });
}

// Extract latest values for summary
const latestAQ = airQualityData.slice(-1)[0];
const latestHeat = heatIslandData.slice(-1)[0];
const latestWater = waterRiskData.slice(-1)[0];

const summary = {
  airQuality: latestAQ || {},
  heatIsland: latestHeat || {},
  waterRisk: latestWater || {},
};

// Optionally call Python ML script for advanced analytics
const pythonProcess = spawn('python3', [
  './ml/report_analysis.py',
  JSON.stringify(summary)
]);

let pythonOutput = '';
pythonProcess.stdout.on('data', (data) => {
  pythonOutput += data.toString();
});

pythonProcess.stderr.on('data', (err) => {
  console.error('Python error in report:', err.toString());
});

pythonProcess.on('close', () => {
  try {
    const insights = JSON.parse(pythonOutput);
    res.json({
      summary,
      insights,
      message: 'Environmental report generated successfully',
    });
  } catch (e) {
    console.error('Error parsing Python output:', e);
    res.json({
      summary,
      insights: null,
      message: 'Report generated with partial insights',
    });
  }
});


} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error generating report' });
}
};
