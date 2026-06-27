from app import db
from datetime import datetime


class Review(db.Model):
    """Review model for storing Amazon product reviews"""
    
    __tablename__ = 'reviews'
    
    review_id = db.Column(db.String(120), primary_key=True, nullable=False, index=True)
    product_id = db.Column(db.String(120), nullable=False, index=True)
    user_id = db.Column(db.String(120), nullable=False, index=True)
    profile_name = db.Column(db.String(255))
    helpful_votes = db.Column(db.Integer, default=0)
    total_votes = db.Column(db.Integer, default=0)
    rating = db.Column(db.Integer, nullable=False)
    review_title = db.Column(db.String(255))
    review_text = db.Column(db.Text)
    review_date = db.Column(db.Date)
    
    
    def __repr__(self):
        return f'<Review {self.review_id}>'
    
    def to_dict(self):
        return {
            'review_id': self.review_id,
            'product_id': self.product_id,
            'user_id': self.user_id,
            'profile_name': self.profile_name,
            'helpful_votes': self.helpful_votes,
            'total_votes': self.total_votes,
            'rating': self.rating,
            'review_title': self.review_title,
            'review_text': self.review_text,
            'review_date': self.review_date.strftime("%Y-%m-%d") if self.review_date else None,
            
        }
