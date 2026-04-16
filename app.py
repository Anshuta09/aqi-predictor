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
    data = [float(x) for x in request.form.values()]
    
    prediction = model.predict([data])[0]
    output = round(prediction, 2)

    print("DEBUG OUTPUT:", output)

    return render_template('index.html', prediction_text=f"Predicted AQI: {output}")



if __name__ == "__main__":
    app.run(debug=True)