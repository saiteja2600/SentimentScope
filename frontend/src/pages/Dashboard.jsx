import { Component } from "react";
import axios from "axios";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageLoader from "../components/PageLoader";

import { Container, Row, Col, Card, Table, Badge, Spinner, OverlayTrigger, Popover } from "react-bootstrap";

import { FaClipboardList, FaStar, FaBoxOpen, FaSmile, FaMeh, FaFrown, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

import "../Styles/Dashboard.css"
class Dashboard extends Component {

  constructor(props) {

    super(props);

    this.state = {

      summary: {},

      latestReviews: [],

      positiveReviews: 0,

      neutralReviews: 0,

      negativeReviews: 0,

      ratingDistribution: [],

      loading: true,

      error: null

    }

  }

  componentDidMount() {

    axios
      .get("http://127.0.0.1:5000/api/dashboard")

      .then((response) => {

        const {

          status,

          summary = {},

          positive_reviews = 0,

          neutral_reviews = 0,

          negative_reviews = 0,

          latest_reviews = [],

          rating_distribution = [],

          message

        } = response.data;

        if (status !== "success") {

          throw new Error(message);

        }

        this.setState({

          summary,

          latestReviews: latest_reviews,

          positiveReviews: positive_reviews,

          neutralReviews: neutral_reviews,

          negativeReviews: negative_reviews,

          ratingDistribution: rating_distribution,

          loading: false

        });

      })

      .catch((error) => {

        this.setState({

          error: error.message,

          loading: false

        });

      });

  }

  render() {

    const {

      summary,

      latestReviews,

      positiveReviews,

      neutralReviews,

      negativeReviews,

      loading,

      error

    } = this.state;

    if (this.state.loading) {

      return (

        <PageLoader
          cards={3}
          charts={2}
        />

      );

    }

    if (error) {

      return (

        <div className="loading-screen">

          <h3 className="text-danger">

            {error}

          </h3>

        </div>

      )

    }

    return (

      <Container fluid className="dashboard">
        <div className="dashboard-page-header mb-5">
          <div className="dashboard-title-wrapper">
            <h2 className="dashboard-page-title">
              Analytics Dashboard
            </h2>

            <p className="dashboard-page-subtitle">
              Monitor key performance metrics, customer review trends, and product insights at a glance.
            </p>
          </div>
        </div>
        <Row className="mb-5">

          {/* <Col>

            <h1 className="dashboard-title">

              📊 SentimentScope

            </h1>

            <p className="dashboard-subtitle">

              Customer Review Analytics Dashboard

            </p>

          </Col> */}

        </Row>

        <Row className="g-4">

          <Col md={4}>

            <Card className="dashboard-card total-card">

              <Card.Body className="card-content">

                <div>

                  <Nav.Link
                    as={Link}
                    to="/reviews"
                    className="text-white text-decoration-none p-0"
                  >
                    <h1 className="text-white">{summary.total_reviews}</h1>
                  </Nav.Link>
                  <h5 className="text-white">Total Reviews</h5>


                </div>

                <div className="card-icon">

                  <FaClipboardList />

                </div>

              </Card.Body>

            </Card>

          </Col>

          <Col md={4}>

            <Card className="dashboard-card rating-card">

              <Card.Body className="card-content">

                <div>

                  <h1 className="text-white">

                    {Number(summary.average_rating).toFixed(1)}

                  </h1>
                  <h5 className="text-white">Average Rating</h5>


                </div>

                <FaStar className="card-icon" />

              </Card.Body>

            </Card>

          </Col>

          <Col md={4}>

            <Card className="dashboard-card product-card">

              <Card.Body className="card-content">

                <div>

                  <h1 className="text-white">{summary.total_products}</h1>
                  <h5 className="text-white">Total Products</h5>


                </div>

                <FaBoxOpen className="card-icon" />

              </Card.Body>

            </Card>

          </Col>

        </Row>

        {/* <Row className="mt-4 g-4">

          <Col md={4}>

            <Card className="dashboard-card positive-card">

              <Card.Body className="card-content">

                <div>

                  <h1 className="text-white">{positiveReviews}</h1>
                  <h5 className="text-white">Positive Reviews</h5>


                </div>

                <FaSmile className="card-icon" />

              </Card.Body>

            </Card>

          </Col>

          <Col md={4}>

            <Card className="dashboard-card neutral-card">

              <Card.Body className="card-content">

                <div>

                  <h1 className="text-white">{neutralReviews}</h1>
                  <h5 className="text-white">Neutral Reviews</h5>


                </div>

                <FaMeh className="card-icon" />

              </Card.Body>

            </Card>

          </Col>

          <Col md={4}>

            <Card className="dashboard-card negative-card">

              <Card.Body className="card-content">

                <div>

                  <h1 className="text-white">{negativeReviews}</h1>
                  <h5 className="text-white">Negative Reviews</h5>


                </div>

                <FaFrown className="card-icon" />

              </Card.Body>

            </Card>

          </Col>

        </Row> */}
        <Row className="mt-5">

          <Col>

            <Card className="table-card shadow">

              {/* Card Header */}

              <Card.Header className="bg-dark text-white">

                <h4 className="mb-0">

                  Latest Reviews

                </h4>

              </Card.Header>

              {/* Card Body */}

              <Card.Body className="p-3">

                {/* Table */}
                <Table
                  striped
                  hover
                  responsive
                  className="mb-0"
                >

                  {/* Table Header */}

                  <thead className="table-dark">

                    <tr>

                      <th>Review ID</th>
                      <th>User ID</th>
                      <th>Profile</th>
                      <th>Product ID</th>
                      <th>Rating</th>
                      <th>Review Title</th>
                      <th>Date</th>

                    </tr>

                  </thead>

                  {/* Table Body */}

                  <tbody>

                    {latestReviews.map((review) => {

                      const reviewPopover = (
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

                            <div className="review-detail">
                              <span className="review-label">Review ID: </span>
                              <strong className="review-value">{review.review_id}</strong>
                            </div>

                            <div className="review-detail">
                              <span className="review-label">User ID: </span>
                              <strong className="review-value">{review.user_id}</strong>
                            </div>

                            <div className="review-detail">
                              <span className="review-label">Profile: </span>
                              <strong className="review-value">{review.profile_name}</strong>
                            </div>

                            <div className="review-detail">
                              <span className="review-label">Product: </span>
                              <strong className="review-value">{review.product_id}</strong>
                            </div>

                            <div className="review-detail">

                              <span className="review-label">Rating: </span>

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

                            </div>

                            <div className="review-detail">
                              <span className="review-label">Helpful Votes: </span>
                              <strong className="review-value">{review.helpful_votes}</strong>
                            </div>

                            <div className="review-detail">
                              <span className="review-label">Total Votes: </span>
                              <strong className="review-value">{review.total_votes}</strong>
                            </div>

                            <div className="review-detail">
                              <span className="review-label">Date: </span>
                              <strong className="review-value">
                                {new Date(review.review_date).toLocaleDateString("en-CA")}
                              </strong>
                            </div>

                            <div className="review-section">

                              <h6 className="review-section-title">
                                Review Title:
                              </h6>

                              <div className="review-title-box">
                                {review.review_title}
                              </div>

                            </div>

                            <div className="review-section">

                              <h6 className="review-section-title">
                                Review Text:
                              </h6>

                              <div className="review-text-box">
                                <p>{review.review_text}</p>
                              </div>

                            </div>

                          </Popover.Body>

                        </Popover>

                      );

                      return (

                        <tr key={review.review_id}>

                          <td>

                            <OverlayTrigger
                              trigger={["hover", "focus"]}
                              placement="right"
                              overlay={reviewPopover}
                            >

                              <span
                                style={{
                                  color: "#0d6efd",
                                  cursor: "pointer",
                                  fontWeight: "bold",
                                  textDecoration: "underline"
                                }}
                              >

                                {review.review_id}

                              </span>

                            </OverlayTrigger>

                          </td>

                          <td>{review.user_id}</td>

                          <td>{review.profile_name}</td>

                          <td>{review.product_id}</td>
                          <td>

                            <Badge
                              bg={
                                review.rating >= 4
                                  ? "success"
                                  : review.rating >= 3
                                    ? "warning"
                                    : "danger"
                              }
                              className="px-3 py-2"
                            >

                              {review.rating >= 4 ? (

                                <>
                                  <FaStar className="badge-success-star me-1" />
                                  {review.rating}
                                </>

                              ) : review.rating >= 3 ? (

                                <>
                                  <FaStarHalfAlt className="badge-warning-star me-1" />
                                  {review.rating}
                                </>

                              ) : (

                                <>
                                  <FaRegStar className="badge-danger-star me-1" />
                                  {review.rating}
                                </>

                              )}

                            </Badge>

                          </td>



                          <td>{review.review_title}</td>

                          <td>

                            {new Date(review.review_date).toLocaleDateString("en-CA")}

                          </td>

                        </tr>

                      );

                    })}

                  </tbody>

                </Table>

              </Card.Body>

            </Card>

          </Col>

        </Row>
      </Container>
    );
  }
}

export default Dashboard;