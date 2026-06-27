import React, { Component } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Table,
  Spinner,
  Badge,
  Pagination,
  OverlayTrigger,
  Popover,
  Row,
  Col,
  Form,
  Button
} from "react-bootstrap";

class Reviews extends Component {

  constructor(props) {

    super(props);

    this.state = {

      reviews: [],
      loading: true,
      error: "",

      page: 1,
      limit: 10,
      total: 0,

      startDate: "",
      endDate: "",

      message: ""

    };

  }

  componentDidMount() {

    this.fetchReviews();

  }

  fetchReviews = (pageNumber = 1) => {

    this.setState({
      loading: true
    });

    axios.get(
      "http://127.0.0.1:5000/api/reviews_data",
      {
        params: {

          page: pageNumber,
          limit: this.state.limit,
          start_date: this.state.startDate,
          end_date: this.state.endDate

        }
      }
    )
      .then((response) => {

        this.setState({

          reviews: response.data.data,
          total: response.data.total,
          page: response.data.page,
          message: response.data.message,
          error: ""

        });

      })
      .catch((error) => {

        if (error.response) {

          this.setState({
            error: error.response.data.message
          });

        }
        else {

          this.setState({
            error: error.message
          });

        }

      })
      .finally(() => {

        this.setState({
          loading: false
        });

      });

  };

  render() {

    const {

      reviews,
      loading,
      error,
      page,
      limit,
      total,
      startDate,
      endDate,
      message

    } = this.state;

    if (loading) {

      return (

        <Container className="text-center mt-5">
          <Spinner animation="border" />
        </Container>

      );

    }

    if (error) {

      return (

        <Container className="mt-5">
          <h4 className="text-danger">{error}</h4>
        </Container>

      );

    }

    const totalPages = Math.ceil(total / limit);

    return (

      <Container fluid className="mt-4">

        <Card className="shadow">

          <Card.Header className="bg-dark text-white">

            <h3>Customer Reviews</h3>

            <small>

              Showing {(page - 1) * limit + 1}
              -
              {Math.min(page * limit, total)}
              {" "}of {total} Reviews

            </small>

          </Card.Header>

          <Card.Body>
            {/* Filter Section */}

            <Row className="mb-4">

              <Col md={3}>

                <Form.Group>

                  <Form.Label>
                    Start Date
                  </Form.Label>

                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) =>
                      this.setState({
                        startDate: e.target.value
                      })
                    }
                  />

                </Form.Group>

              </Col>

              <Col md={3}>

                <Form.Group>

                  <Form.Label>
                    End Date
                  </Form.Label>

                  <Form.Control
                    type="date"
                    value={endDate}
                    onChange={(e) =>
                      this.setState({
                        endDate: e.target.value
                      })
                    }
                  />

                </Form.Group>

              </Col>

              <Col
                md={4}
                className="d-flex align-items-end"
              >

                <Button
                  variant="primary"
                  onClick={() => {

                    if (
                      startDate &&
                      endDate &&
                      startDate > endDate
                    ) {

                      alert("Start Date cannot be greater than End Date.");

                      return;

                    }

                    this.fetchReviews(1);

                  }}
                >
                  Filter
                </Button>

                <Button
                  variant="secondary"
                  className="ms-2"
                  onClick={() => {

                    this.setState(
                      {
                        startDate: "",
                        endDate: "",
                        message: "",
                        error: ""
                      },
                      () => {

                        this.fetchReviews(1);

                      }
                    );

                  }}
                >
                  Reset
                </Button>

              </Col>

            </Row>

            {/* No Records Message */}

            {/* {message && (

              <div className="alert alert-warning text-center">

                {message}

              </div>

            )} */}

            {/* Reviews Table */}

            <Table
              striped
              hover
              responsive
            >

              <thead className="table-dark">

                <tr>

                  <th>Review ID</th>
                  <th>User ID</th>
                  <th>Profile</th>
                  <th>Product ID</th>
                  <th>Rating</th>
                  <th>Total Votes</th>
                  <th>Review Title</th>
                  <th>Date</th>

                </tr>

              </thead>

              <tbody>

                {reviews.length > 0 ? (

                  reviews.map((review) => {

                    const reviewPopover = (

                      <Popover id={`popover-${review.review_id}`}>

                        <Popover.Header as="h5">
                          Review Details
                        </Popover.Header>

                        <Popover.Body>

                          <p>
                            <strong>Review ID:</strong> {review.review_id}
                          </p>

                          <p>
                            <strong>User ID:</strong> {review.user_id}
                          </p>

                          <p>
                            <strong>Profile:</strong> {review.profile_name}
                          </p>

                          <p>
                            <strong>Product:</strong> {review.product_id}
                          </p>

                          <p>
                            <strong>Rating:</strong> ⭐ {review.rating}
                          </p>

                          <p>
                            <strong>Helpful Votes:</strong> {review.helpful_votes}
                          </p>

                          <p>
                            <strong>Total Votes:</strong> {review.total_votes}
                          </p>

                          <p>
                            <strong>Date:</strong>{" "}
                            {new Date(review.review_date).toLocaleDateString("en-CA")}
                          </p>

                          <hr />

                          <strong>Review Title</strong>

                          <p>{review.review_title}</p>

                          <strong>Review Text</strong>

                          <div
                            style={{
                              maxHeight: "150px",
                              overflowY: "auto"
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
                                textDecoration: "underline",
                                fontWeight: "bold"
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
                          >
                            ⭐ {review.rating}
                          </Badge>

                        </td>

                        <td>{review.total_votes}</td>

                        <td>{review.review_title}</td>

                        <td>
                          {new Date(review.review_date).toLocaleDateString("en-CA")}
                        </td>

                      </tr>

                    );

                  })

                ) : (

                  <tr>

                    <td
                      colSpan="8"
                      className="text-center text-danger fw-bold"
                    >

                      {message || "No Reviews Found"}

                    </td>

                  </tr>

                )}

              </tbody>

            </Table>
            {/* Pagination */}

            <Pagination className="justify-content-center mt-4">

              <Pagination.Prev
                disabled={page === 1}
                onClick={() => this.fetchReviews(page - 1)}
              />

              <Pagination.Item active>
                {page}
              </Pagination.Item>

              <Pagination.Next
                disabled={page === totalPages}
                onClick={() => this.fetchReviews(page + 1)}
              />

            </Pagination>

            <div className="text-center mt-3">

              <strong>
                Page {page} of {totalPages}
              </strong>

            </div>

          </Card.Body>

        </Card>

      </Container>

    );

  }

}

export default Reviews;