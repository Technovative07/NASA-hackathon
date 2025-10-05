 
 

import sys
import json
import numpy as np
import joblib

 
MODEL_PATH = r"C:\Users\PIYUSH\Desktop\New folder\backend\ml\models\air_quality_model.pkl"
SCALER_PATH = r"C:\Users\PIYUSH\Desktop\New folder\backend\ml\models\scaler.pkl"

try:
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
except Exception as e:
    print(f"Error loading model: {e}", file=sys.stderr)
    sys.exit(1)

 
try:
    if len(sys.argv) > 1:
        raw_input = sys.argv[1]   
        data = json.loads(raw_input)   
    else:
        # Default for testing
        data = [{
            "PM2.5": 23,
            "PM10": 70,
            "NO2": 12,
            "SO2": 5,
            "CO": 359,
            "O3": 14
        }]
        print("⚠️ No input provided, using default sample:", data)
except Exception as e:
    print(f"Invalid input: {e}", file=sys.stderr)
    sys.exit(1)

 
try:
      
    features = np.array([
        [d["PM2.5"], d["PM10"], d["NO2"], d["SO2"], d["CO"], d["O3"]]
        for d in data
    ], dtype=float)

    features_scaled = scaler.transform(features)
    prediction = model.predict(features_scaled)

    predicted_aqi = float(prediction[0])
except Exception as e:
    print(f"Error during preprocessing/prediction: {e}", file=sys.stderr)
    sys.exit(1)

 
print(predicted_aqi)

