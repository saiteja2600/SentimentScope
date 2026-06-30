import { Component } from "react";
import axios from "axios";
import "../Styles/Analytics.css";
import PageLoader from "../components/PageLoader";
import RatingDistribution from "../components/RatingDistribution";
import SentimentDistribution from "../components/SentimentDistribution";
import ReviewTrend from "../components/ReviewTrend"
import RatingSentiment from "../components/RatingSentiment";
import MonthlyComparison from "../components/MonthlyComparision";

import {
  Container,
  Row,
  Col,
  Card
} from "react-bootstrap";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart
} from "recharts";

import {

  FaChartBar,
  FaChartPie,
  FaLayerGroup,
  FaChartLine,
  FaStar,
  FaSmile,
  FaMeh,
  FaFrown,
  FaClipboardList,
  FaPercentage,
  FaStarHalfAlt,
  FaRegStar,
  FaInfoCircle,
  FaCalendarAlt

} from "react-icons/fa";



class Analytics extends Component {

  constructor(props) {

    super(props);

    this.state = {

      ratingDistribution: [],
      sentimentDistribution: [],
      overtimeReview: [],

      ratingSentiment: [],
      monthlyComparison: [],


      ratingView: "2D",

      sentimentView: "2D",
      reviewTrendView: "2D",
      monthlyComparisonView: '2D',
      ratingSentimentView: '2D',

      loading: true,

      error: ""

    };

  }

  fetchRatingDistribution = () => {

    axios
      .get("http://127.0.0.1:5000/api/analytics")
      .then((response) => {

        this.setState({

          ratingDistribution: response.data.rating_distribution,

          sentimentDistribution: response.data.sentiment_distribution,
          overtimeReview: response.data.review_over_time,
          ratingSentiment: response.data.rating_sentiment,

          monthlyComparison: response.data.monthly_comparison,

          loading: false

        });

      })
      .catch((error) => {

        this.setState({

          error: error.message,
          loading: false

        });

      });

  };

  componentDidMount() {

    this.fetchRatingDistribution();

  }

  render() {

    const {

      ratingDistribution,
      sentimentDistribution,
      overtimeReview,
      ratingSentiment,
      monthlyComparison,
      loading,
      error

    } = this.state;

    const COLORS = [

      "#22c55e",
      "#facc15",
      "#ef4444"

    ];

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

        <div className="analytics-error">

          {error}

        </div>

      );

    }
    const transformedRatingSentiment = [];

    for (let rating = 5; rating >= 1; rating--) {

      const row = {
        rating: `${rating}★`,
        Positive: 0,
        Neutral: 0,
        Negative: 0
      };

      ratingSentiment.forEach(item => {

        if (item.rating === rating) {

          row[item.sentiment] = item.total_reviews;

        }

      });

      transformedRatingSentiment.push(row);

    }



    return (

      <Container fluid className="analytics-page">


        <div className="analytics-page-header mb-5">

          <div className="analytics-title-wrapper">

            <h2 className="analytics-page-title">
              Analytics
            </h2>

            <p className="analytics-page-subtitle">
              Explore customer review trends, sentiment distribution, ratings, and performance insights through interactive visualizations.
            </p>

          </div>

        </div>

        <Row className="g-4">

          <Col>

            <h2 className="analytics-title">

              <FaLayerGroup className="me-2" /> Analytics

            </h2>

          </Col>

        </Row>

        <Row className="g-4">



          <Col
            xl={6}
            lg={6}
            md={12}
            sm={12}
            className="mb-4"
          >

            <RatingDistribution

              ratingDistribution={ratingDistribution}

              ratingView={this.state.ratingView}

              onViewChange={(view) =>
                this.setState({
                  ratingView: view
                })
              }

            />

          </Col>

          {/* Sentiment Distribution */}



          <Col xl={6} lg={6} md={12} sm={12} className="mb-4">

            <SentimentDistribution

              sentimentDistribution={sentimentDistribution}

              sentimentView={this.state.sentimentView}

              COLORS={COLORS}

              onViewChange={(view) =>
                this.setState({
                  sentimentView: view
                })
              }

            />

          </Col>

        </Row>
        <Row className="g-4">

          <Col
            xl={12}
            lg={12}
            md={12}
            className="mb-4"
          >

            <ReviewTrend

              overtimeReview={this.state.overtimeReview}

              reviewTrendView={this.state.reviewTrendView}

              onViewChange={(view) =>
                this.setState({
                  reviewTrendView: view
                })
              }

            />
          </Col>

        </Row>

        <Row className="g-4">

          <Col xl={6} lg={6} md={12} className="mb-4">

            <RatingSentiment

              transformedRatingSentiment={transformedRatingSentiment}

              ratingSentimentView={this.state.ratingSentimentView}

              onViewChange={(view) =>
                this.setState({
                  ratingSentimentView: view
                })
              }

            />

          </Col>
          <Col
            xl={6}
            lg={6}
            md={12}
            className="mb-4"
          >

            <MonthlyComparison

              monthlyComparison={monthlyComparison}

              monthlyComparisonView={this.state.monthlyComparisonView}

              onViewChange={(view) =>
                this.setState({

                  monthlyComparisonView: view

                })
              }

            />

          </Col>

        </Row>

      </Container>

    );

  }

}

export default Analytics;