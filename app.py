from flask import Flask, request, jsonify, render_template
import numpy as np
import pickle

app = Flask(__name__)

# Load model
with open("rf_model.pkl", "rb") as f:
    model = pickle.load(f)

def aqi_to_category(aqi):
    if aqi <= 50:
        return "Good"
    elif aqi <= 100:
        return "Moderate"
    elif aqi <= 200:
        return "Poor"
    elif aqi <= 300:
        return "Very Poor"
    else:
        return "Severe"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # 🔹 Get input values
    data = [float(x) for x in request.form.values()]

    # 🔹 Prediction
    prediction = model.predict([data])[0]
    output = round(prediction, 2)

    # 🔹 AQI Category
    category = aqi_to_category(output)

    # 🔹 Feature Names (IMPORTANT: order must match training)
    features = [
    "pm25", "pm10", "no2", "so2", "co", "o3",
    "temperature", "humidity", "wind_speed",
    "visibility", "month", "hour"
    ]

    # 🔥 ADD HERE
    display_names = {
        "pm25": "PM2.5",
        "pm10": "PM10",
        "no2": "NO2",
        "so2": "SO2",
        "co": "CO",
        "o3": "O3",
        "temperature": "Temperature",
        "humidity": "Humidity",
        "wind_speed": "Wind Speed",
        "visibility": "Visibility",
        "month": "Month",
        "hour": "Hour"
    }

    # 🔹 Feature Importance (for Pie Chart)
    importance = model.feature_importances_

    importance_dict = {
    display_names[features[i]]: round(float(importance[i]), 3)
    for i in range(len(features))
    }

    top_feature = max(importance_dict, key=importance_dict.get)

    # 🔹 Input Data (for Bar Chart)
    input_dict = {
    display_names[features[i]]: data[i]
    for i in range(len(features))
    }

    print("AQI:", output)
    print("Category:", category)
    print("Importance:", importance_dict)

    return render_template(
    'index.html',
    prediction_text=f"{output}",
    category=category,
    importance=importance_dict,
    inputs=input_dict,
    top_feature=top_feature   # 🔥 ADD THIS LINE
    )



if __name__ == "__main__":
    app.run(debug=True)
