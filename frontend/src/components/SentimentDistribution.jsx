import { Component } from "react";

import { Card } from "react-bootstrap";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

import {

  FaChartPie,
  FaSmile,
  FaMeh,
  FaFrown,
  FaClipboardList,
  FaPercentage,
  FaInfoCircle

} from "react-icons/fa";

class SentimentDistribution extends Component {

  render() {

    const {

      sentimentDistribution,
      sentimentView,
      onViewChange,
      COLORS

    } = this.props;

    return (

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
                  sentimentView === "2D"
                    ? "toggle-btn active"
                    : "toggle-btn"
                }

                onClick={() => onViewChange("2D")}

              >

                2D

              </button>

              <button

                className={
                  sentimentView === "3D"
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

              <PieChart>

                <Pie

                  data={sentimentDistribution}

                  dataKey="total_reviews"

                  nameKey="sentiment"

                  innerRadius={
                    sentimentView === "3D"
                      ? 90
                      : 60
                  }

                  outerRadius={
                    sentimentView === "3D"
                      ? 140
                      : 120
                  }

                  paddingAngle={
                    sentimentView === "3D"
                      ? 5
                      : 2
                  }

                  stroke="#ffffff"

                  strokeWidth={
                    sentimentView === "3D"
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

                            <FaClipboardList className="me-2 text-info" />

                            <strong>Total Reviews:</strong>

                            {" "}

                            {current.total_reviews}

                          </p>

                          <p className="mb-2">

                            <FaPercentage className="me-2 text-success" />

                            <strong>Percentage:</strong>

                            {" "}

                            {percentage}%

                          </p>

                          <p className="mb-3">

                            <FaInfoCircle className="me-2 text-warning" />

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

    );

  }

}

export default SentimentDistribution;