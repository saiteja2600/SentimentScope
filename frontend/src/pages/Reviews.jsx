import { Component } from "react";
import axios from "axios";

import {
  Container,
  Card,
  Spinner
} from "react-bootstrap";


import ReviewFilter from "../components/ReviewFilter";
import ReviewTable from "../components/ReviewTable";
import ReviewPagination from "../components/ReviewPagination";
import ReviewToast from "../components/ReviewToast";

class Reviews extends Component {

  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      page: 1,
      totalPages: 1,
      limit: 10,

      rating: "",
      startDate: "",
      endDate: "",

      loading: false,

      message: "",

      showToast: false,
      toastMessage: "",
      toastVariant: "success"
    };
  }

  componentDidMount() {
    this.fetchReviews();
  }

  showNotification = (message, variant) => {
    this.setState({
      showToast: true,
      toastMessage: message,
      toastVariant: variant
    });
  };

  fetchReviews = (pageNumber = 1) => {

    const {
      limit,
      rating,
      startDate,
      endDate
    } = this.state;

    this.setState({
      loading: true
    });

    axios
      .get("http://127.0.0.1:5000/api/reviews_data", {
        params: {
          page: pageNumber,
          limit,
          rating,
          start_date: startDate,
          end_date: endDate
        }
      })
      .then((response) => {

        this.setState({
          reviews: response.data.data,
          page: response.data.page,
          totalPages: response.data.total_pages,
          message: response.data.message
        });

      })
      .catch(() => {

        this.showNotification(
          "Unable to load reviews.",
          "danger"
        );

      })
      .finally(() => {

        this.setState({
          loading: false
        });

      });

  };

  handleFilter = () => {

    const {
      startDate,
      endDate
    } = this.state;

    if (
      startDate &&
      endDate &&
      startDate === endDate
    ) {

      this.showNotification(
        "Start Date and End Date cannot be the same.",
        "warning"
      );

      return;
    }

    if (
      startDate &&
      endDate &&
      startDate > endDate
    ) {

      this.showNotification(
        "Start Date cannot be greater than End Date.",
        "danger"
      );

      return;
    }

    this.fetchReviews(1);

  };

  render() {

    const {
      reviews,
      page,
      totalPages,
      limit,
      rating,
      startDate,
      endDate,
      loading,
      message,
      showToast,
      toastMessage,
      toastVariant
    } = this.state;

    return (

      <Container fluid className="reviews-page py-4">

        <div className="reviews-page-header mb-4">

          <div className="reviews-title-wrapper">

            <h2 className="reviews-page-title">
              Customer Feedback
            </h2>

            <p className="reviews-page-subtitle">
              Browse, filter, and analyze customer reviews with powerful search and filtering tools.
            </p>

          </div>

        </div>

        <Card className="shadow-sm border-0">

          <Card.Body>

            <ReviewFilter
              page={page}
              limit={limit}
              rating={rating}
              startDate={startDate}
              endDate={endDate}
              setLimit={(limit) =>
                this.setState(
                  { limit },
                  () => this.fetchReviews(1)
                )
              }
              setRating={(rating) =>
                this.setState(
                  { rating },
                  () => this.fetchReviews(1)
                )
              }
              setStartDate={(startDate) =>
                this.setState({ startDate })
              }
              setEndDate={(endDate) =>
                this.setState({ endDate })
              }
              onFilter={this.handleFilter}
            />

            {loading ? (

              <div className="text-center py-5">

                <Spinner
                  animation="border"
                  variant="primary"
                />

              </div>

            ) : (

              <>

                <ReviewTable
                  reviews={reviews}
                  message={message}
                />

                <ReviewPagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={this.fetchReviews}
                />

              </>

            )}

          </Card.Body>

        </Card>

        <ReviewToast
          show={showToast}
          message={toastMessage}
          variant={toastVariant}
          onClose={() =>
            this.setState({
              showToast: false
            })
          }
        />

      </Container>

    );

  }

}

export default Reviews;