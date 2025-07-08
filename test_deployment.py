#!/usr/bin/env python3
"""
Test script to verify model compatibility with new package versions
"""
import pickle
import numpy as np
import os

def test_model():
    model_path = os.path.join(os.path.dirname(__file__), "Augumented.pkl")
    
    try:
        # Test model loading
        with open(model_path, "rb") as model_file:
            model = pickle.load(model_file)
        print("✓ Model loaded successfully")
        
        # Test prediction
        test_cgpa = 8.5
        prediction = model.predict([[test_cgpa]])
        package = float(prediction[0]) if hasattr(prediction, '__len__') else float(prediction)
        print(f"✓ Prediction test successful: CGPA {test_cgpa} -> Package {package}")
        
        return True
        
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

if __name__ == "__main__":
    print("Testing model compatibility...")
    success = test_model()
    if success:
        print("All tests passed! Model is ready for deployment.")
    else:
        print("Tests failed. Please check the model file.") 