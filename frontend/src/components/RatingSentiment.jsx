import { Component } from "react";
import { Card } from "react-bootstrap";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import { FaChartBar } from "react-icons/fa";

class RatingSentiment extends Component {

  render() {

    const {

      transformedRatingSentiment,
      ratingSentimentView,
      onViewChange

    } = this.props;

    return (

      <Card className="analytics-card">

        <Card.Header className="analytics-header">

          <div className="d-flex justify-content-between align-items-center">

            <div>

              <FaChartBar className="me-2" />

              Rating vs Sentiment Analysis

            </div>

            <div className="chart-toggle">

              <button
                className={
                  ratingSentimentView === "2D"
                    ? "toggle-btn active"
                    : "toggle-btn"
                }
                onClick={() => onViewChange("2D")}
              >

                2D

              </button>

              <button
                className={
                  ratingSentimentView === "3D"
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

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <BarChart
              data={transformedRatingSentiment}
            >

              {ratingSentimentView === "3D" && (

                <defs>

                  <linearGradient
                    id="positiveGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopColor="#34d399"
                    />

                    <stop
                      offset="100%"
                      stopColor="#059669"
                    />

                  </linearGradient>

                  <linearGradient
                    id="neutralGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopColor="#fde047"
                    />

                    <stop
                      offset="100%"
                      stopColor="#eab308"
                    />

                  </linearGradient>

                  <linearGradient
                    id="negativeGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopColor="#fb7185"
                    />

                    <stop
                      offset="100%"
                      stopColor="#dc2626"
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

                    const current = payload[0].payload;

                    const total =
                      current.Positive +
                      current.Neutral +
                      current.Negative;

                    return (

                      <div
                        style={{
                          background: "#1f2937",
                          color: "#fff",
                          padding: "15px",
                          borderRadius: "12px",
                          border: "2px solid #2563eb",
                          minWidth: "250px"
                        }}
                      >

                        <h6
                          style={{
                            color: "#60a5fa",
                            marginBottom: "12px"
                          }}
                        >

                          Rating vs Sentiment

                        </h6>

                        <p>

                          <strong>

                            Rating :

                          </strong>

                          {" "}

                          {current.rating}

                        </p>

                        <p
                          style={{
                            color: "#22c55e"
                          }}
                        >

                          Positive :

                          {" "}

                          {current.Positive}

                        </p>

                        <p
                          style={{
                            color: "#facc15"
                          }}
                        >

                          Neutral :

                          {" "}

                          {current.Neutral}

                        </p>

                        <p
                          style={{
                            color: "#ef4444"
                          }}
                        >

                          Negative :

                          {" "}

                          {current.Negative}

                        </p>

                        <hr />

                        <p>

                          <strong>

                            Total Reviews :

                          </strong>

                          {" "}

                          {total}

                        </p>

                      </div>

                    );

                  }

                  return null;

                }}

              />

              <Legend />

              <Bar
                dataKey="Positive"
                stackId="a"
                fill={
                  ratingSentimentView === "3D"
                    ? "url(#positiveGradient)"
                    : "#22c55e"
                }
                radius={
                  ratingSentimentView === "3D"
                    ? [8, 8, 0, 0]
                    : [4, 4, 0, 0]
                }
              />

              <Bar
                dataKey="Neutral"
                stackId="a"
                fill={
                  ratingSentimentView === "3D"
                    ? "url(#neutralGradient)"
                    : "#facc15"
                }
              />

              <Bar
                dataKey="Negative"
                stackId="a"
                fill={
                  ratingSentimentView === "3D"
                    ? "url(#negativeGradient)"
                    : "#ef4444"
                }
              />

            </BarChart>

          </ResponsiveContainer>

        </Card.Body>

      </Card>

    );

  }

}

export default RatingSentiment;