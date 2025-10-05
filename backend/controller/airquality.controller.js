import { spawn } from 'child_process';
import dataFetcher from '../utils/dataFetcher.js';


 
const predictAirQuality = async (req, res) => {
  try {
    let recentData = req.body.recentData;

     
    if (!recentData || recentData.length < 7) {
      const allData = dataFetcher.loadProcessedData('air_quality_processed.json');
      if (!allData) return res.status(500).json({ error: 'Processed air quality data not found' });

      recentData = allData.slice(-7);  }
    const pythonProcess = spawn('python3', [
      './ml/air_quality_model.py',
      JSON.stringify(recentData)  
    ]);

    pythonProcess.stdout.on('data', (data) => {
      const prediction = parseFloat(data.toString());
      res.json({ prediction });
    });

    pythonProcess.stderr.on('data', (err) => {
      console.error('Python error:', err.toString());
      res.status(500).json({ error: 'Error running Python ML script' });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error predicting AQI' });
  }
};

export default predictAirQuality;
