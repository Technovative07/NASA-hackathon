
 

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.ensemble import RandomForestRegressor
import os, joblib

 
print("Loading dataset...")

csv_path = r"C:\Users\PIYUSH\Desktop\frontend\Bangalore_AQI_Dataset.csv"

# Load safely (skip problematic rows)
data = pd.read_csv(csv_path, on_bad_lines="skip")

print("Columns detected:", data.columns.tolist())

 
data = data.dropna()

 
y = data["AQI"]

 
X = data.drop(columns=["City", "Date", "AQI"], errors="ignore")

 
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)


scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

 
print("Training model...")
model = RandomForestRegressor(n_estimators=200, random_state=42)
model.fit(X_train_scaled, y_train)

 
y_pred = model.predict(X_test_scaled)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Model Evaluation:")
print(f"  MSE: {mse:.4f}")
print(f"  R²: {r2:.4f}")

 
os.makedirs("backend/ml/models", exist_ok=True)
joblib.dump(model, "backend/ml/models/air_quality_model.pkl")
joblib.dump(scaler, "backend/ml/models/scaler.pkl")

print("✅ Model and scaler saved successfully in backend/ml/models/")

