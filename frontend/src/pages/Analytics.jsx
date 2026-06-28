import { Component } from "react";
import axios from "axios";
import "../Styles/Analytics.css";

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
  Area
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

      ratingView: "2D",

      sentimentView: "2D",
      reviewTrendView: "2D",

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
      loading,
      error

    } = this.state;

    const COLORS = [

      "#22c55e",
      "#facc15",
      "#ef4444"

    ];

    if (loading) {

      return (

        <div className="analytics-loading">

          Loading Analytics...

        </div>

      );

    }

    if (error) {

      return (

        <div className="analytics-error">

          {error}

        </div>

      );

    }



    return (

      <Container fluid className="analytics-page">


        {/* Heading */}

        <Row className="mb-4">

          <Col>

            <h2 className="analytics-title">

              <FaLayerGroup className="me-2" /> Analytics

            </h2>

          </Col>

        </Row>

        <Row>



          <Col xl={6} lg={6} md={12} sm={12} className="mb-4">

            <Card className="analytics-card">

              <Card.Header className="analytics-header">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <FaChartBar className="me-2" />

                    Rating Distribution

                  </div>

                  <div className="chart-toggle">

                    <button
                      className={
                        this.state.ratingView === "2D"
                          ? "toggle-btn active"
                          : "toggle-btn"
                      }

                      onClick={() =>
                        this.setState({
                          ratingView: "2D"
                        })
                      }

                    >

                      2D

                    </button>

                    <button
                      className={
                        this.state.ratingView === "3D"
                          ? "toggle-btn active"
                          : "toggle-btn"
                      }

                      onClick={() =>
                        this.setState({
                          ratingView: "3D"
                        })
                      }

                    >

                      3D

                    </button>

                  </div>

                </div>

              </Card.Header>

              <Card.Body>

                <div className="chart-container">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >


                    <BarChart data={ratingDistribution}>

                      {this.state.ratingView === "3D" && (

                        <defs>

                          <linearGradient
                            id="ratingGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >

                            <stop
                              offset="0%"
                              stopColor="#070c13"
                            />

                            <stop
                              offset="100%"
                              stopColor="#1d4ed8"
                            />

                          </linearGradient>

                        </defs>

                      )}

                      <CartesianGrid strokeDasharray="3 3" />

                      <XAxis dataKey="rating" />

                      <YAxis />

                      <Tooltip
                        content={({ active, payload }) => {

                          if (active && payload && payload.length) {

                            const totalReviews = ratingDistribution.reduce(
                              (sum, item) => sum + item["Total Reviews"],
                              0
                            );

                            const current = payload[0].payload;

                            const percentage = (
                              (current["Total Reviews"] / totalReviews) * 100
                            ).toFixed(2);

                            let sentiment = "";
                            let SentimentIcon = FaSmile;
                            let progressColor = "#22c55e";

                            if (current.rating >= 4) {

                              sentiment = "Positive";
                              SentimentIcon = FaSmile;
                              progressColor = "#22c55e";

                            }
                            else if (current.rating === 3) {

                              sentiment = "Neutral";
                              SentimentIcon = FaMeh;
                              progressColor = "#facc15";

                            }
                            else {

                              sentiment = "Negative";
                              SentimentIcon = FaFrown;
                              progressColor = "#ef4444";

                            }

                            return (

                              <div
                                style={{
                                  background: "#1f2937",
                                  color: "#fff",
                                  padding: "15px",
                                  borderRadius: "12px",
                                  border: "1px solid #2563eb",
                                  boxShadow: "0 8px 20px rgba(0,0,0,.35)",
                                  minWidth: "240px"
                                }}
                              >

                                <h6
                                  style={{
                                    color: "#60a5fa",
                                    marginBottom: "12px"
                                  }}
                                >

                                  Rating Details

                                </h6>

                                <p className="mb-2">

                                  <strong className="me-2">Rating:</strong>

                                  {[1, 2, 3, 4, 5].map((star) => {

                                    if (current.rating >= star) {

                                      return (
                                        <FaStar
                                          key={star}
                                          className="text-warning me-1"
                                        />
                                      );

                                    }
                                    else if (current.rating >= star - 0.5) {

                                      return (
                                        <FaStarHalfAlt
                                          key={star}
                                          className="text-warning me-1"
                                        />
                                      );

                                    }

                                    return (
                                      <FaRegStar
                                        key={star}
                                        className="text-warning me-1"
                                      />
                                    );

                                  })}

                                  <span className="ms-2 fw-bold">

                                    ({current.rating})

                                  </span>

                                </p>
                                <p className="mb-2">

                                  <SentimentIcon
                                    className="me-2"
                                    style={{ color: progressColor }}
                                  />

                                  <strong>Sentiment:</strong> {sentiment}

                                </p>

                                <p className="mb-2">

                                  <FaClipboardList
                                    className="me-2 text-info"
                                  />

                                  <strong>Total Reviews:</strong> {current["Total Reviews"]}

                                </p>

                                <p className="mb-3">

                                  <FaPercentage
                                    className="me-2 text-success"
                                  />

                                  <strong>Percentage:</strong> {percentage}%

                                </p>

                                <div
                                  style={{
                                    background: "#374151",
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    height: "8px"
                                  }}
                                >

                                  <div
                                    style={{
                                      width: `${percentage}%`,
                                      height: "100%",
                                      background: progressColor
                                    }}
                                  />

                                </div>

                              </div>

                            );

                          }

                          return null;

                        }}
                      />

                      <Bar

                        dataKey="Total Reviews"

                        fill={
                          this.state.ratingView === "3D"
                            ? "url(#ratingGradient)"
                            : "#2563eb"
                        }

                        radius={
                          this.state.ratingView === "3D"
                            ? [18, 18, 4, 4]
                            : [6, 6, 0, 0]
                        }

                      />

                    </BarChart>

                  </ResponsiveContainer>

                </div>

              </Card.Body>

            </Card>

          </Col>

          {/* Sentiment Distribution */}

          <Col xl={6} lg={6} md={12} sm={12} className="mb-4">

            <Card className="analytics-card">

              <Card.Header className="analytics-header">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <FaChartPie className="me-2" />

                    Sentiment Distribution

                  </div>

                  <div className="chart-toggle">

                    <button
                      className={
                        this.state.sentimentView === "2D"
                          ? "toggle-btn active"
                          : "toggle-btn"
                      }

                      onClick={() =>
                        this.setState({
                          sentimentView: "2D"
                        })
                      }

                    >

                      2D

                    </button>

                    <button
                      className={
                        this.state.sentimentView === "3D"
                          ? "toggle-btn active"
                          : "toggle-btn"
                      }

                      onClick={() =>
                        this.setState({
                          sentimentView: "3D"
                        })
                      }

                    >

                      3D

                    </button>

                  </div>

                </div>

              </Card.Header>

              <Card.Body>

                <div className="chart-container">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <PieChart>

                      <Pie

                        data={sentimentDistribution}

                        dataKey="total_reviews"

                        nameKey="sentiment"

                        innerRadius={
                          this.state.sentimentView === "3D"
                            ? 90
                            : 60
                        }

                        outerRadius={
                          this.state.sentimentView === "3D"
                            ? 140
                            : 120
                        }

                        paddingAngle={
                          this.state.sentimentView === "3D"
                            ? 5
                            : 2
                        }

                        stroke="#ffffff"

                        strokeWidth={
                          this.state.sentimentView === "3D"
                            ? 4
                            : 1
                        }

                      >

                        {sentimentDistribution.map((entry, index) => (

                          <Cell
                            key={index}
                            fill={COLORS[index]}
                          />

                        ))}

                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {

                          if (active && payload && payload.length) {

                            const totalReviews = sentimentDistribution.reduce(
                              (sum, item) => sum + item.total_reviews,
                              0
                            );

                            const current = payload[0].payload;

                            const percentage = (
                              (current.total_reviews / totalReviews) * 100
                            ).toFixed(2);

                            let SentimentIcon = FaSmile;
                            let color = "#22c55e";
                            let ratingRange = "Ratings 4 - 5";

                            if (current.sentiment === "Neutral") {

                              SentimentIcon = FaMeh;
                              color = "#facc15";
                              ratingRange = "Rating 3";

                            }

                            if (current.sentiment === "Negative") {

                              SentimentIcon = FaFrown;
                              color = "#ef4444";
                              ratingRange = "Ratings 1 - 2";

                            }

                            return (

                              <div
                                style={{
                                  background: "#1f2937",
                                  color: "#fff",
                                  borderRadius: "12px",
                                  padding: "15px",
                                  minWidth: "250px",
                                  border: `2px solid ${color}`,
                                  boxShadow: "0 8px 20px rgba(0,0,0,.35)"
                                }}
                              >

                                <h6
                                  style={{
                                    color: color,
                                    marginBottom: "12px"
                                  }}
                                >

                                  <SentimentIcon className="me-2" />

                                  {current.sentiment} Reviews

                                </h6>

                                <p className="mb-2">

                                  <FaClipboardList
                                    className="me-2 text-info"
                                  />

                                  <strong>Total Reviews:</strong>

                                  {" "}

                                  {current.total_reviews}

                                </p>

                                <p className="mb-2">

                                  <FaPercentage
                                    className="me-2 text-success"
                                  />

                                  <strong>Percentage:</strong>

                                  {" "}

                                  {percentage}%

                                </p>

                                <p className="mb-3">

                                  <FaInfoCircle
                                    className="me-2 text-warning"
                                  />

                                  <strong>Rating Range:</strong>

                                  {" "}

                                  {ratingRange}

                                </p>

                                <div
                                  style={{
                                    height: "8px",
                                    borderRadius: "8px",
                                    background: "#374151",
                                    overflow: "hidden"
                                  }}
                                >

                                  <div
                                    style={{
                                      width: `${percentage}%`,
                                      height: "100%",
                                      background: color
                                    }}
                                  />

                                </div>

                              </div>

                            );

                          }

                          return null;

                        }}
                      />

                      <Legend />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </Card.Body>

            </Card>

          </Col>

        </Row>
        <Row>

          <Col
            xl={12}
            lg={12}
            md={12}
            className="mb-4"
          >

            <Card className="analytics-card">

              <Card.Header className="analytics-header">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <FaChartLine className="me-2" />

                    Reviews Over Time

                  </div>

                  <div className="chart-toggle">

                    <button
                      className={
                        this.state.reviewTrendView === "2D"
                          ? "toggle-btn active"
                          : "toggle-btn"
                      }
                      onClick={() =>
                        this.setState({
                          reviewTrendView: "2D"
                        })
                      }
                    >
                      2D
                    </button>

                    <button
                      className={
                        this.state.reviewTrendView === "3D"
                          ? "toggle-btn active"
                          : "toggle-btn"
                      }
                      onClick={() =>
                        this.setState({
                          reviewTrendView: "3D"
                        })
                      }
                    >
                      3D
                    </button>

                  </div>

                </div>

              </Card.Header>

              <Card.Body>

                <div className="chart-container">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    {this.state.reviewTrendView === "2D" ? (

                      <LineChart data={overtimeReview}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                          dataKey="month"
                          tickFormatter={(value) => {
                            const [month, year] = value.split(" ");
                            return month === "Jan" ? year : "";
                          }}
                          interval={0}
                          label={{
                            value: "Years",
                            position: "insideBottom",
                            offset: -5
                          }}
                        />

                        <YAxis
                          label={{
                            value: "Reviews",
                            angle: -90,
                            position: "insideLeft"
                          }}
                        />

                        <Tooltip
                          content={({ active, payload }) => {

                            if (active && payload && payload.length) {

                              const current = payload[0].payload;

                              return (

                                <div
                                  style={{
                                    background: "#1f2937",
                                    color: "#fff",
                                    borderRadius: "12px",
                                    padding: "15px",
                                    minWidth: "230px",
                                    border: "2px solid #2563eb",
                                    boxShadow: "0 8px 20px rgba(0,0,0,.35)"
                                  }}
                                >

                                  <h6
                                    style={{
                                      color: "#60a5fa",
                                      marginBottom: "12px"
                                    }}
                                  >

                                    <FaChartLine className="me-2" />

                                    Review Trend

                                  </h6>

                                  <p className="mb-2">

                                    <FaCalendarAlt className="me-2 text-warning" />

                                    <strong>Month:</strong>

                                    {" "}

                                    {current.month}

                                  </p>

                                  <p className="mb-2">

                                    <FaClipboardList className="me-2 text-info" />

                                    <strong>Total Reviews:</strong>

                                    {" "}

                                    {current["Total Reviews"]}

                                  </p>

                                </div>

                              );

                            }

                            return null;

                          }}
                        />

                        <Legend />

                        <Line
                          type="monotone"
                          dataKey="Total Reviews"
                          name="Reviews"
                          stroke="#2563eb"
                          strokeWidth={3}
                          dot={{ r: 5 }}
                        />

                      </LineChart>

                    ) : (

                      <AreaChart data={overtimeReview}>

                        <defs>

                          <linearGradient
                            id="reviewGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >

                            <stop
                              offset="5%"
                              stopColor="#2563eb"
                              stopOpacity={0.8}
                            />

                            <stop
                              offset="95%"
                              stopColor="#2563eb"
                              stopOpacity={0}
                            />

                          </linearGradient>

                        </defs>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                          dataKey="month"
                          tickFormatter={(value) => {
                            const [month, year] = value.split(" ");
                            return month === "Jan" ? year : "";
                          }}
                          interval={0}
                          label={{
                            value: "Years",
                            position: "insideBottom",
                            offset: -5
                          }}
                        />

                        <YAxis
                          label={{
                            value: "Reviews",
                            angle: -90,
                            position: "insideLeft"
                          }}
                        />

                        <Tooltip
                          content={({ active, payload }) => {

                            if (active && payload && payload.length) {

                              const current = payload[0].payload;

                              return (

                                <div
                                  style={{
                                    background: "#1f2937",
                                    color: "#fff",
                                    borderRadius: "12px",
                                    padding: "15px",
                                    minWidth: "230px",
                                    border: "2px solid #2563eb",
                                    boxShadow: "0 8px 20px rgba(0,0,0,.35)"
                                  }}
                                >

                                  <h6
                                    style={{
                                      color: "#60a5fa",
                                      marginBottom: "12px"
                                    }}
                                  >

                                    <FaChartLine className="me-2" />

                                    Review Trend

                                  </h6>

                                  <p className="mb-2">

                                    <FaCalendarAlt className="me-2 text-warning" />

                                    <strong>Month:</strong>

                                    {" "}

                                    {current.month}

                                  </p>

                                  <p className="mb-2">

                                    <FaClipboardList className="me-2 text-info" />

                                    <strong>Total Reviews:</strong>

                                    {" "}

                                    {current["Total Reviews"]}

                                  </p>

                                </div>

                              );

                            }

                            return null;

                          }}
                        />

                        <Legend
                          verticalAlign="top"
                          height={40}
                        />

                        <Area
                          type="monotone"
                          dataKey="Total Reviews"
                          name="Reviews"
                          stroke="#31498b"
                          fill="url(#reviewGradient)"
                          strokeWidth={3}
                        />

                      </AreaChart>

                    )}

                  </ResponsiveContainer>

                </div>

              </Card.Body>

            </Card>

          </Col>

        </Row>

      </Container>

    );

  }

}

export default Analytics;