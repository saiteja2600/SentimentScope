import { Component } from "react";

import { Card } from "react-bootstrap";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

import {
  FaChartBar,
  FaSmile,
  FaMeh,
  FaFrown,
  FaClipboardList,
  FaPercentage,
  FaStar,
  FaStarHalfAlt,
  FaRegStar
} from "react-icons/fa";

class RatingDistribution extends Component {

  render() {

    const {

      ratingDistribution,
      ratingView,
      onViewChange

    } = this.props;

    return (

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
                  ratingView === "2D"
                    ? "toggle-btn active"
                    : "toggle-btn"
                }
                onClick={() => onViewChange("2D")}
              >

                2D

              </button>

              <button
                className={
                  ratingView === "3D"
                    ? "toggle-btn active"
                    : "toggle-btn"
                }
                onClick={() => onViewChange("3D")}
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

              <BarChart
                data={ratingDistribution}
              >

                {ratingView === "3D" && (

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

                <CartesianGrid
                  stroke="rgba(255,255,255,.08)"
                  strokeDasharray="2 6"
                  vertical={false}
                />

                <XAxis
                  dataKey="rating"
                />

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

                            <strong className="me-2">

                              Rating:

                            </strong>

                            {[1, 2, 3, 4, 5].map((star) => {

                              if (current.rating >= star) {

                                return (

                                  <FaStar
                                    key={star}
                                    className="text-warning me-1"
                                  />

                                );

                              }

                              if (current.rating >= star - 0.5) {

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
                              style={{
                                color: progressColor
                              }}
                            />

                            <strong>

                              Sentiment:

                            </strong>

                            {" "}

                            {sentiment}

                          </p>

                          <p className="mb-2">

                            <FaClipboardList
                              className="me-2 text-info"
                            />

                            <strong>

                              Total Reviews:

                            </strong>

                            {" "}

                            {current["Total Reviews"]}

                          </p>

                          <p className="mb-3">

                            <FaPercentage
                              className="me-2 text-success"
                            />

                            <strong>

                              Percentage:

                            </strong>

                            {" "}

                            {percentage}%

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

                <Legend />

                <Bar

                  dataKey="Total Reviews"

                  fill={
                    ratingView === "3D"
                      ? "url(#ratingGradient)"
                      : "#2563eb"
                  }

                  radius={
                    ratingView === "3D"
                      ? [18, 18, 4, 4]
                      : [6, 6, 0, 0]
                  }

                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </Card.Body>

      </Card>

    );

  }

}

export default RatingDistribution;