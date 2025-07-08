from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np
import os

# Use relative path and proper path handling
model_path = os.path.join(os.path.dirname(__file__), "Augumented.pkl")

try:
    with open(model_path, "rb") as model_file:
        model = pickle.load(model_file)
    print("Model loaded successfully")
except FileNotFoundError:
    print(f"Error: Model file not found at {model_path}")
    model = None
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        if model is None:
            return jsonify({"error": "Model not available"}), 500
            
        data = request.get_json()
        cgpa = data.get("cgpa")
        if cgpa is None:
            return jsonify({"error": "CGPA is required"}), 400

        cgpa = float(cgpa)
        if cgpa < 0 or cgpa > 10:
            return jsonify({"error": "CGPA must be between 0 and 10"}), 400
        
        # Fixed logic: Check if CGPA is between 0 and 4.5 (exclusive of 0)
        if cgpa > 0 and cgpa < 4.5:
            return jsonify({"error": "Not Eligible for Placement."}), 200

        # Fix deprecation warning by properly extracting the prediction
        prediction = model.predict([[cgpa]])
        package = float(prediction[0]) if hasattr(prediction, '__len__') else float(prediction)
        return jsonify({"predicted_package": np.round(package, 2)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
