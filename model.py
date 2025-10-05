
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, r2_score
import joblib

# Import your model from air_quality_model.py
from air_quality.model import get_model  # Assume get_model() returns an initialized regressor

# ===============================
# Load Dataset
# ===============================
print("Loading dataset...")
data = pd.read_csv(r"C:\Users\PIYUSH\Desktop\frontend\Bangalore_AQI_Dataset.csv")  # Replace with actual path

# Example: dataset columns → ['date', 'pm25', 'pm10', 'no2', 'so2', 'o3', 'temperature', 'humidity', 'wind_speed']
# Drop rows with missing values
data = data.dropna()

# Features and target
X = data.drop(columns=["pm25", "date"])  # pm25 as target
y = data["pm25"]

# ===============================
# Train/Test Split
# ===============================
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ===============================
# Preprocessing
# ===============================
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# ===============================
# Model Training
# ===============================
print("Training model...")
model = get_model()
model.fit(X_train_scaled, y_train)

# ===============================
# Evaluation
# ===============================
y_pred = model.predict(X_test_scaled)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Model Evaluation:")
print(f"  MSE: {mse:.4f}")
print(f"  R²: {r2:.4f}")

# ===============================
# Save Model + Scaler
# ===============================
joblib.dump(model, "models/air_quality_model.pkl")
joblib.dump(scaler, "models/scaler.pkl")

print("Model and scaler saved successfully in /models/")

