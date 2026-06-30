import React, { Component } from "react";
import { Popover } from "react-bootstrap";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar
} from "react-icons/fa";

class ReviewPopover extends Component {
  render() {
    const { review } = this.props;

    return (
      <Popover
        id={`popover-${review.review_id}`}
        className="review-popover"
      >
        <Popover.Header
          as="h5"
          className="review-popover-header"
        >
          Review Details
        </Popover.Header>

        <Popover.Body className="review-popover-body">

          <p className="review-detail">
            <strong className="review-label">Review ID:</strong>
            <span className="review-value">{review.review_id}</span>
          </p>

          <p className="review-detail">
            <strong className="review-label">User ID:</strong>
            <span className="review-value">{review.user_id}</span>
          </p>

          <p className="review-detail">
            <strong className="review-label">Profile:</strong>
            <span className="review-value">{review.profile_name}</span>
          </p>

          <p className="review-detail">
            <strong className="review-label">Product:</strong>
            <span className="review-value">{review.product_id}</span>
          </p>

          <p className="review-detail">
            <strong className="review-label">Rating:</strong>

            <span className="review-rating">
              {review.rating >= 4 ? (
                <>
                  <FaStar className="rating-good me-1" />
                  <span className="rating-good">{review.rating}</span>
                </>
              ) : review.rating >= 3 ? (
                <>
                  <FaStarHalfAlt className="rating-average me-1" />
                  <span className="rating-average">{review.rating}</span>
                </>
              ) : (
                <>
                  <FaRegStar className="rating-poor me-1" />
                  <span className="rating-poor">{review.rating}</span>
                </>
              )}
            </span>
          </p>

          <p className="review-detail">
            <strong className="review-label">Helpful Votes:</strong>
            <span className="review-value">
              {review.helpful_votes}
            </span>
          </p>

          <p className="review-detail">
            <strong className="review-label">Total Votes:</strong>
            <span className="review-value">
              {review.total_votes}
            </span>
          </p>

          <p className="review-detail">
            <strong className="review-label">Date:</strong>
            <span className="review-value">
              {new Date(review.review_date).toLocaleDateString("en-CA")}
            </span>
          </p>

          <hr className="review-divider" />

          <div className="review-section">
            <h6 className="review-section-title">
              Review Title
            </h6>

            <div className="review-title-box">
              {review.review_title}
            </div>
          </div>

          <div className="review-section">
            <h6 className="review-section-title">
              Review Text
            </h6>

            <div className="review-text-box">
              {review.review_text}
            </div>
          </div>

        </Popover.Body>
      </Popover>
    );
  }
}

export default ReviewPopover;