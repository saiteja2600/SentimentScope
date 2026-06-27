"""
Flask application entry point
Run: python run.py
"""
import os
from app import create_app

app = create_app()

if __name__ == '__main__':
    # Set debug mode from environment or default to True
    debug = os.getenv('FLASK_ENV', 'development') == 'development'
    
    # Run the Flask server
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=debug
    )
