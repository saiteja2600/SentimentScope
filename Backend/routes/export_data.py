from flask import Blueprint, request, jsonify, send_file
from app.connection import get_connection

import psycopg2.extras
import pandas as pd
import io

export_bp = Blueprint("export_data", __name__)


@export_bp.route("/export_reviews", methods=["GET"])
def export_reviews():

    try:

        mode = request.args.get("mode")

        page = request.args.get("page", 1, type=int)
        limit = request.args.get("limit", 10, type=int)

        rating = request.args.get("rating")

        start_date = request.args.get("start_date")
        end_date = request.args.get("end_date")

        conn = get_connection()

        cursor = conn.cursor(
            cursor_factory=psycopg2.extras.RealDictCursor
        )

        query = """
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

            WHERE 1 = 1
        """

        params = []

        # ---------------- Rating Filter ----------------

        if rating:

            query += """
                AND rating = %s
            """

            params.append(rating)

        # ---------------- Date Filter ----------------

        if start_date and end_date:

            query += """
                AND review_date BETWEEN %s AND %s
            """

            params.extend([

                start_date,
                end_date

            ])

        # ---------------- Export Mode ----------------

        if mode == "current":

            offset = (page - 1) * limit

            query += """
                ORDER BY review_date DESC
                LIMIT %s OFFSET %s
            """

            params.extend([

                limit,
                offset

            ])

        elif mode == "filtered":

            query += """
                ORDER BY review_date DESC
            """

        elif mode == "all":

            query = """
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

                ORDER BY review_date DESC
            """

            params = []

        else:

            return jsonify({

                "status": "error",
                "message": "Invalid export mode."

            }), 400

        # ---------------- Execute ----------------

        cursor.execute(

            query,
            params

        )

        reviews = cursor.fetchall()

        cursor.close()
        conn.close()

        # ---------------- Convert to CSV ----------------

        df = pd.DataFrame(reviews)

        output = io.StringIO()

        df.to_csv(

            output,

            index=False

        )

        csv_data = io.BytesIO(

            output.getvalue().encode("utf-8")

        )

        csv_data.seek(0)

        return send_file(

            csv_data,

            mimetype="text/csv",

            as_attachment=True,

            download_name=f"reviews_{mode}.csv"

        )

    except Exception as e:

        return jsonify({

            "status": "error",
            "message": str(e)

        }), 500