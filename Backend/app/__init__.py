from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os
from dotenv import load_dotenv
from urllib.parse import quote_plus

# Load environment variables
env_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(env_path)

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    """Application factory for Flask app"""
    app = Flask(__name__)
    
    # Database configuration
    db_user = os.getenv("DB_USER")
    db_password = quote_plus(os.getenv("DB_PASSWORD", ""))
    db_host = os.getenv("DB_HOST")
    db_port = os.getenv("DB_PORT", "5432")
    db_name = os.getenv("DB_NAME")
    
    app.config['SQLALCHEMY_DATABASE_URI'] = (
        f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
    )
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JSON_SORT_KEYS'] = False
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Enable CORS for frontend communication
    CORS(app)
    
    # Import models so Alembic can detect them for migrations
    from models.review import Review
    
    # Register blueprints (routes)
    from routes.review_routes import review_bp
    from routes.dashboard_review import dashboard_bp
    from routes.analytics_review import analytics_bp

    app.register_blueprint(review_bp, url_prefix='/api')
    app.register_blueprint(dashboard_bp, url_prefix='/api')
    app.register_blueprint(analytics_bp, url_prefix='/api')

    
    return app