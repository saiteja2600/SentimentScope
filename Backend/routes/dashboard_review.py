from flask import Blueprint, jsonify
import psycopg2.extras

from app.connection import get_connection

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/dashboard", methods=["GET"])
def dashboard():

    try:
        conn = get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        # ================================
        # Dashboard Summary
        # ================================

        summary_query = """
            SELECT
                COUNT(*) AS total_reviews,
                ROUND(AVG(rating),2) AS average_rating,
                COUNT(DISTINCT product_id) AS total_products,
                COUNT(DISTINCT user_id) AS total_users
            FROM Reviews;
        """

        cursor.execute(summary_query)
        summary = cursor.fetchone() or {}

        # ================================
        # Rating Distribution
        # ================================

        rating_query = """
            SELECT
                rating,
                COUNT(*) AS total
            FROM Reviews
            GROUP BY rating
            ORDER BY rating DESC;
        """

        cursor.execute(rating_query)
        rating_distribution = cursor.fetchall() or []

        # ================================
        # Positive Reviews (4 & 5)
        # ================================

        cursor.execute("""
            SELECT COUNT(*) AS positive_reviews
            FROM Reviews
            WHERE rating >= 4;
        """)

        positive = cursor.fetchone() or {}

        # ================================
        # Neutral Reviews (3)
        # ================================

        cursor.execute("""
            SELECT COUNT(*) AS neutral_reviews
            FROM Reviews
            WHERE rating = 3;
        """)

        neutral = cursor.fetchone() or {}

        # ================================
        # Negative Reviews (1 & 2)
        # ================================

        cursor.execute("""
            SELECT COUNT(*) AS negative_reviews
            FROM Reviews
            WHERE rating <= 2;
        """)

        negative = cursor.fetchone() or {}

        # ================================
        # Latest 10 Reviews
        # ================================

        latest_reviews_query = """
            SELECT
                review_id,
                product_id,
                user_id,
                profile_name,
                helpful_votes,
                total_votes,
                rating,
                review_title,
                review_text,
                review_date
            FROM Reviews
            ORDER BY review_id DESC
            LIMIT 10;
        """

        cursor.execute(latest_reviews_query)
        latest_reviews = cursor.fetchall() or []

        cursor.close()
        conn.close()

        return jsonify({

            "status": "success",

            "summary": summary,

            "positive_reviews": positive.get("positive_reviews", 0),

            "neutral_reviews": neutral.get("neutral_reviews", 0),

            "negative_reviews": negative.get("negative_reviews", 0),

            "rating_distribution": rating_distribution,

            "latest_reviews": latest_reviews

        }), 200

    except Exception as e:

        return jsonify({

            "status": "error",

            "message": str(e)

        }), 500