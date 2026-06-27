from flask import Blueprint, jsonify, request
from app.connection import get_connection
import psycopg2.extras

review_bp = Blueprint("review_data", __name__)


@review_bp.route("/reviews_data", methods=["GET"])
def get_reviews():

    try:

        page = request.args.get("page", 1, type=int)
        limit = request.args.get("limit", 10, type=int)
        offset = (page - 1) * limit

        start_date = request.args.get("start_date")
        end_date = request.args.get("end_date")

        # ---------------- VALIDATION ----------------

        if start_date and end_date and start_date > end_date:
            return jsonify({
                "status": "error",
                "message": "Start Date cannot be greater than End Date."
            }), 400

        conn = get_connection()
        cursor = conn.cursor(
            cursor_factory=psycopg2.extras.RealDictCursor
        )

        # ---------------- COUNT QUERY ----------------

        count_query = """
            SELECT COUNT(*) AS total
            FROM reviews
        """

        count_params = []

        if start_date and end_date:

            count_query += """
                WHERE review_date BETWEEN %s AND %s
            """

            count_params.extend([
                start_date,
                end_date
            ])

        cursor.execute(count_query, count_params)

        row = cursor.fetchone()

        total = row["total"] if row else 0

        # ---------------- DATA QUERY ----------------

        data_query = """
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
                TO_CHAR(review_date,'YYYY-MM-DD') AS review_date
            FROM reviews
        """

        data_params = []

        if start_date and end_date:

            data_query += """
                WHERE review_date BETWEEN %s AND %s
            """

            data_params.extend([
                start_date,
                end_date
            ])

        data_query += """
            ORDER BY review_date DESC
            LIMIT %s OFFSET %s
        """

        data_params.extend([
            limit,
            offset
        ])

        cursor.execute(data_query, data_params)

        reviews = cursor.fetchall()

        message = ""

        if start_date and end_date and len(reviews) == 0:

            message = (
                f"No reviews found between "
                f"{start_date} and {end_date}."
            )

        cursor.close()
        conn.close()

        return jsonify({

            "status": "success",
            "page": page,
            "limit": limit,
            "total": total,
            "message": message,
            "data": reviews

        })

    except Exception as e:

        return jsonify({

            "status": "error",
            "message": str(e)

        }), 500