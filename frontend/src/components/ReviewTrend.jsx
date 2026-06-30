import { Component } from "react";
import { Card } from "react-bootstrap";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import {
  FaChartLine,
  FaCalendarAlt,
  FaClipboardList
} from "react-icons/fa";

class ReviewTrend extends Component {

  render() {

    const {

      overtimeReview,
      reviewTrendView,
      onViewChange

    } = this.props;

    return (

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
                  reviewTrendView === "2D"
                    ? "toggle-btn active"
                    : "toggle-btn"
                }
                onClick={() => onViewChange("2D")}
              >
                2D
              </button>

              <button
                className={
                  reviewTrendView === "3D"
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

              {reviewTrendView === "2D" ? (

                <LineChart data={overtimeReview}>

                  <CartesianGrid
                    stroke="rgba(255,255,255,.08)"
                    strokeDasharray="2 6"
                    vertical={false}
                  />

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

                              <strong>Month:</strong> {current.month}

                            </p>

                            <p className="mb-2">

                              <FaClipboardList className="me-2 text-info" />

                              <strong>Total Reviews:</strong> {current["Total Reviews"]}

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

                  <CartesianGrid
                    stroke="rgba(255,255,255,.08)"
                    strokeDasharray="2 6"
                    vertical={false}
                  />

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

                              <strong>Month:</strong> {current.month}

                            </p>

                            <p className="mb-2">

                              <FaClipboardList className="me-2 text-info" />

                              <strong>Total Reviews:</strong> {current["Total Reviews"]}

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

    );

  }

}

export default ReviewTrend;