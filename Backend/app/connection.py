import os
import psycopg2 as pg
from dotenv import load_dotenv

# Load .env from current directory
env_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(env_path)

def get_connection():
    # Check if all required environment variables are set
    required_vars = ["DB_HOST", "DB_PORT", "DB_NAME", "DB_USER", "DB_PASSWORD"]
    missing_vars = [var for var in required_vars if not os.getenv(var)]
    
    if missing_vars:
        raise ValueError(f"Missing environment variables: {', '.join(missing_vars)}")
    
    try:
        conn = pg.connect(
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT"),
            database=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD")
        )
        print("Database connection successful")
        return conn
    except pg.Error as e:
        print(f"Error connecting to database: {e}")
        raise

if __name__ == "__main__":
    get_connection()