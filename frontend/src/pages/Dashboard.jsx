import { Component } from "react";
import axios from "axios";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Container, Row, Col, Card, Table, Badge, Spinner, OverlayTrigger, Popover } from "react-bootstrap";

import { FaClipboardList, FaStar, FaBoxOpen, FaSmile, FaMeh, FaFrown, FaStarHalfAlt, FaRegStar } from "react-icons/fa";


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

    if (loading) {

      return (

        <div className="loading-screen">

          <Spinner
            animation="border"
            variant="light"
          />

          <h3 className="mt-3 text-white">

            Loading Dashboard...

          </h3>

        </div>

      )

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
                          style={{ maxWidth: "420px" }}
                        >

                          <Popover.Header as="h5">

                            Review Details

                          </Popover.Header>

                          <Popover.Body>

                            <table className="table table-sm">

                              <tbody>

                                <tr>
                                  <th>Review ID</th>
                                  <td>{review.review_id}</td>
                                </tr>

                                <tr>
                                  <th>User ID</th>
                                  <td>{review.user_id}</td>
                                </tr>

                                <tr>
                                  <th>Profile</th>
                                  <td>{review.profile_name}</td>
                                </tr>

                                <tr>
                                  <th>Product</th>
                                  <td>{review.product_id}</td>
                                </tr>

                                <tr>
                                  <th>Rating</th>

                                  <td>

                                    {review.rating >= 4 ? (

                                      <>
                                        <FaStar className="text-warning me-1" />
                                        {review.rating}
                                      </>

                                    ) : review.rating >= 3 ? (

                                      <>
                                        <FaStarHalfAlt className="text-warning me-1" />
                                        {review.rating}
                                      </>

                                    ) : (

                                      <>
                                        <FaRegStar className="text-warning me-1" />
                                        {review.rating}
                                      </>

                                    )}

                                  </td>

                                </tr>

                                <tr>
                                  <th>Helpful Votes</th>
                                  <td>{review.helpful_votes}</td>
                                </tr>

                                <tr>
                                  <th>Total Votes</th>
                                  <td>{review.total_votes}</td>
                                </tr>

                                <tr>
                                  <th>Date</th>
                                  <td>{review.review_date}</td>
                                </tr>

                                <tr>
                                  <th>Review Title</th>
                                  <td>{review.review_title}</td>
                                </tr>

                              </tbody>

                            </table>

                            <hr />

                            <h6>Review Text</h6>

                            <div
                              style={{
                                maxHeight: "150px",
                                overflowY: "auto",
                                background: "#f8f9fa",
                                padding: "10px",
                                borderRadius: "10px"
                              }}
                            >

                              {review.review_text}

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
                          <td><Badge
                            bg={
                              review.rating >= 4
                                ? "success"
                                : review.rating >= 3
                                  ? "warning"
                                  : "danger"
                            }
                          >
                            {review.rating >= 4 ? (

                              <>
                                <FaStar className="text-warning me-1" />
                                {review.rating}
                              </>

                            ) : review.rating >= 3 ? (

                              <>
                                <FaStarHalfAlt className="text-warning me-1" />
                                {review.rating}
                              </>

                            ) : (

                              <>
                                <FaRegStar className="text-warning me-1" />
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