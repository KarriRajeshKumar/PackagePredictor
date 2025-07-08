# CGPA Package Predictor

A Flask web application that predicts salary packages based on student CGPA using machine learning.

## 🎯 Features
- **CGPA-based salary prediction** using machine learning
- **Beautiful, responsive UI** with modern design
- **Real-time predictions** with loading animations
- **Input validation** and error handling
- **Mobile-friendly** interface

## 🛠️ Tech Stack
- **Backend**: Flask 3.0.0 (Python 3.13.4)
- **Frontend**: HTML, CSS, JavaScript
- **ML**: Scikit-learn 1.4.0 with Linear Regression
- **Deployment**: Render (Live)

## 📊 How It Works
The application uses a trained **Linear Regression model** to predict salary packages based on CGPA. The model analyzes the relationship between CGPA and salary packages to provide accurate predictions.

## 🌐 Live Website
**Visit the live application:** [https://packagepredictor.onrender.com/](https://packagepredictor.onrender.com/)

## 🚀 Local Development
```bash
# Install dependencies
pip install -r requirements.txt

# Test model compatibility
python test_deployment.py

# Run the application
python app1.py

# Visit http://localhost:5000
```

## 🌐 Usage
1. Enter your CGPA (0-10 scale)
2. Click "Predict Package" or press Enter
3. Get your predicted salary package instantly!

## 📁 Project Structure
```
├── app1.py              # Flask application
├── Augumented.pkl       # Trained ML model
├── templates/
│   └── index.html       # Main interface
├── static/
│   ├── style.css        # Styling
│   └── script.js        # Frontend logic
├── requirements.txt     # Python dependencies
├── Procfile            # Deployment configuration
├── test_deployment.py  # Model compatibility test
└── README.md           # Project documentation
```

## 🔧 Deployment
This application is deployed on **Render** with the following configuration:

### Build Command
```bash
pip install -r requirements.txt
```

### Start Command
```bash
gunicorn app1:app
```

### Environment
- **Python Version**: 3.13.4
- **Flask**: 3.0.0
- **NumPy**: 1.26.4
- **Scikit-learn**: 1.4.0

## 🐛 Troubleshooting
If you encounter deployment issues:
1. Run `python test_deployment.py` to verify model compatibility
2. Check that all dependencies in `requirements.txt` are compatible with Python 3.13.4
3. Ensure the model file `Augumented.pkl` is present in the root directory

## 📝 Recent Updates
- Updated package versions for Python 3.13.4 compatibility
- Fixed deprecation warnings in prediction logic
- Added model compatibility testing
- Improved error handling and logging 