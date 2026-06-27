import sys
import os
import pandas as pd
from datetime import datetime

# Change to Backend directory and add it to path
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(backend_dir)
sys.path.insert(0, backend_dir)

from app.connection import get_connection


def read_csv_data():

    column_names = [
        "review_id",
        "product_id",
        "user_id",
        "profile_name",
        "helpful_votes",
        "total_votes",
        "rating",
        "review_time",      # Unix Timestamp
        "review_title",
        "review_text"
    ]

    df = pd.read_csv(
        r"D:\Repostery\SentimentScope\AmazonFineFoods3k.csv",
        header=None,
        names=column_names
    )

    print(df.head())        # Check the data
    print(df.columns)

    return df


def insert_csv_data():

    df = read_csv_data()

    conn = get_connection()
    cursor = conn.cursor()

    insert_query = """
    INSERT INTO public.reviews
    (
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
    )
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """

    count = 0

    for _, row in df.iterrows():

        review_date = datetime.fromtimestamp(
            int(row["review_time"])
        ).date()

        cursor.execute(
            insert_query,
            (
                int(row["review_id"]),
                str(row["product_id"]),
                str(row["user_id"]),
                str(row["profile_name"]),
                int(row["helpful_votes"]),
                int(row["total_votes"]),
                int(row["rating"]),
                str(row["review_title"]),
                str(row["review_text"]),
                review_date
            )
        )

        count += 1

        if count % 100 == 0:
            conn.commit()
            print(f"{count} records inserted")

    conn.commit()

    cursor.close()
    conn.close()

    print(f"Successfully inserted {count} records")


if __name__ == "__main__":
    insert_csv_data()