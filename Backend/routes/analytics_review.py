from flask import Blueprint, jsonify
from app.connection import get_connection
import psycopg2.extras

analytics_bp = Blueprint("analytics", __name__)

@analytics_bp.route("/analytics", methods=["GET"])
def analytics_dp():

    try:

        conn = get_connection()

        cursor = conn.cursor(
            cursor_factory=psycopg2.extras.RealDictCursor
        )

        total_distribution = """
          SELECT
              rating,
              COUNT(*) AS "Total Reviews"
          FROM public.reviews
          GROUP BY rating
          ORDER BY rating DESC
          """

        cursor.execute(total_distribution)
        rating_data = cursor.fetchall()

        sentiment_distribution = """
        SELECT
            CASE
                WHEN rating >= 4 THEN 'Positive'
                WHEN rating = 3 THEN 'Neutral'
                ELSE 'Negative'
            END AS sentiment,

            COUNT(*) AS total_reviews

        FROM public.reviews

        GROUP BY sentiment

        ORDER BY total_reviews DESC
        """

        cursor.execute(sentiment_distribution)
        sentiment_data = cursor.fetchall()

        
        review_over_time = """
                SELECT
            TO_CHAR(review_date, 'Mon YYYY') AS month,
            COUNT(*) AS "Total Reviews"
        FROM public.reviews
        GROUP BY DATE_TRUNC('month', review_date),
                TO_CHAR(review_date, 'Mon YYYY')
        ORDER BY DATE_TRUNC('month', review_date);
                """
        cursor.execute(review_over_time)
        overtime_data = cursor.fetchall()
        
        rating_sentiment = """
                SELECT
            rating,
            CASE
                WHEN rating >= 4 THEN 'Positive'
                WHEN rating = 3 THEN 'Neutral'
                ELSE 'Negative'
            END AS sentiment,
            COUNT(*) AS total_reviews
        FROM reviews
        GROUP BY rating, sentiment
        ORDER BY rating DESC, sentiment;"""
        
        cursor.execute(rating_sentiment)
        rating_sentiment_data = cursor.fetchall()
        
        
        monthly_comparison = """
                SELECT
    TO_CHAR(review_date,'Mon YYYY') AS "Month",
    ROUND(AVG(rating),2) AS "Average Rating",
    COUNT(*) AS "Total Reviews"
FROM reviews
GROUP BY
    DATE_TRUNC('month', review_date),
    TO_CHAR(review_date,'Mon YYYY')
ORDER BY DATE_TRUNC('month', review_date);
        """
        
        cursor.execute(monthly_comparison)
        montly_comprasion_data = cursor.fetchall()
        

        cursor.close()
        conn.close()

        return jsonify({

    "status": "success",

    "rating_distribution": rating_data,

    "sentiment_distribution": sentiment_data,

    "review_over_time": overtime_data,
    "rating_sentiment":rating_sentiment_data,
      "monthly_comparison": montly_comprasion_data

})

    except Exception as e:

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500