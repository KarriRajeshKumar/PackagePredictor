#!/usr/bin/env python3
"""
Main application entry point for Render deployment
This file ensures compatibility with Render's default gunicorn configuration
"""

import os

# Import the Flask app from app1.py
from app1 import app

if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=int(os.environ.get('PORT', 5000))) 