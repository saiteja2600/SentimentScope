import { Component } from "react";

import { Card } from "react-bootstrap";

import {

  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
  Area

} from "recharts";

import {

  FaCalendarAlt,
  FaClipboardList,
  FaStar,
  FaStarHalfAlt,
  FaRegStar

} from "react-icons/fa";

class MonthlyComparison extends Component {

  renderTooltip = ({ active, payload }) => {

    if (!active || !payload || !payload.length) {

      return null;

    }

    const current = payload[0].payload;

    return (

      <div
        style={{
          background: "linear-gradient(135deg,#0f172a,#1e293b)",
          border: "1px solid rgba(96,165,250,.35)",
          borderRadius: "16px",
          padding: "18px",
          minWidth: "260px",
          color: "#fff",
          backdropFilter: "blur(12px)",
          boxShadow: "0 15px 35px rgba(0,0,0,.45)"
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
            color: "#60a5fa",
            fontWeight: 700,
            fontSize: "16px"
          }}
        >

          <FaCalendarAlt
            style={{
              marginRight: "8px"
            }}
          />

          Monthly Performance

        </div>

        <hr
          style={{
            borderColor: "rgba(255,255,255,.08)"
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "12px"
          }}
        >

          <span>

            <FaCalendarAlt
              className="me-2"
              color="#fbbf24"
            />

            Month

          </span>

          <strong>

            {current["Month"]}

          </strong>

        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "12px"
          }}
        >

          <span>

            <FaClipboardList
              className="me-2"
              color="#3b82f6"
            />

            Reviews

          </span>

          <strong>

            {current["Total Reviews"]}

          </strong>

        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >

          <span>

            <FaStar
              className="me-2"
              color="#facc15"
            />

            Rating

          </span>

          <div>

            {[1, 2, 3, 4, 5].map((star) => {

              if (current["Average Rating"] >= star) {

                return (

                  <FaStar
                    key={star}
                    color="#facc15"
                  />

                );

              }

              if (current["Average Rating"] >= star - .5) {

                return (

                  <FaStarHalfAlt
                    key={star}
                    color="#facc15"
                  />

                );

              }

              return (

                <FaRegStar
                  key={star}
                  color="#6b7280"
                />

              );

            })}

            <span
              style={{
                marginLeft: "8px",
                color: "#22c55e",
                fontWeight: 700
              }}
            >

              {current["Average Rating"]}

            </span>

          </div>

        </div>

        <div
          style={{
            marginTop: "15px"
          }}
        >

          <div
            style={{
              height: "6px",
              borderRadius: "10px",
              overflow: "hidden",
              background: "rgba(255,255,255,.08)"
            }}
          >

            <div
              style={{
                width: `${(current["Average Rating"] / 5) * 100}%`,
                height: "100%",
                background: "linear-gradient(90deg,#22c55e,#10b981)"
              }}
            />

          </div>

        </div>

      </div>

    );

  };

  render() {

    const {

      monthlyComparison,

      monthlyComparisonView,

      onViewChange

    } = this.props;
    return (

      <Card className="analytics-card">

        <Card.Header className="analytics-header">

          <div className="d-flex justify-content-between align-items-center">

            <div>

              <FaCalendarAlt className="me-2" />

              Monthly Comparison

            </div>

            <div className="chart-toggle">

              <button

                className={
                  monthlyComparisonView === "2D"
                    ? "toggle-btn active"
                    : "toggle-btn"
                }

                onClick={() => onViewChange("2D")}

              >

                2D

              </button>

              <button

                className={
                  monthlyComparisonView === "3D"
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

            {monthlyComparisonView === "2D" ? (

              <ComposedChart
                data={monthlyComparison}
              >

                <CartesianGrid
                  stroke="rgba(255,255,255,.08)"
                  strokeDasharray="2 6"
                  vertical={false}
                />

                <XAxis

                  dataKey="Month"

                  tickFormatter={(value) => {

                    const [month, year] = value.split(" ");

                    return month === "Jan"
                      ? year
                      : "";

                  }}

                  interval={0}

                  label={{

                    value: "Years",

                    position: "insideBottom",

                    offset: -5

                  }}

                />

                <YAxis

                  yAxisId="left"

                  label={{

                    value: "Reviews",

                    angle: -90,

                    position: "insideLeft"

                  }}

                />

                <YAxis

                  yAxisId="right"

                  orientation="right"

                  domain={[0, 5]}

                  label={{

                    value: "Rating",

                    angle: 90,

                    position: "insideRight"

                  }}

                />

                <Tooltip

                  cursor={{

                    stroke: "#60a5fa",

                    strokeWidth: 2,

                    strokeDasharray: "5 5"

                  }}

                  content={this.renderTooltip}

                />

                <Legend />

                <Bar

                  yAxisId="left"

                  dataKey="Total Reviews"

                  fill="#2563eb"

                  radius={[5, 5, 0, 0]}

                />

                <Line

                  yAxisId="right"

                  type="monotone"

                  dataKey="Average Rating"

                  stroke="#22c55e"

                  strokeWidth={3}

                  dot={{ r: 5 }}

                />

              </ComposedChart>

            ) : (
              <ComposedChart
                data={monthlyComparison}
              >

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
                      stopColor="#22c55e"
                      stopOpacity={0.8}
                    />

                    <stop
                      offset="95%"
                      stopColor="#22c55e"
                      stopOpacity={0}
                    />

                  </linearGradient>

                  <linearGradient
                    id="barGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopColor="#60a5fa"
                    />

                    <stop
                      offset="100%"
                      stopColor="#2563eb"
                    />

                  </linearGradient>

                </defs>

                <CartesianGrid
                  stroke="rgba(255,255,255,.08)"
                  strokeDasharray="2 6"
                  vertical={false}
                />

                <XAxis

                  dataKey="Month"

                  tickFormatter={(value) => {

                    const [month, year] = value.split(" ");

                    return month === "Jan"
                      ? year
                      : "";

                  }}

                  interval={0}

                  label={{

                    value: "Years",

                    position: "insideBottom",

                    offset: -5

                  }}

                />

                <YAxis

                  yAxisId="left"

                  label={{

                    value: "Reviews",

                    angle: -90,

                    position: "insideLeft"

                  }}

                />

                <YAxis

                  yAxisId="right"

                  orientation="right"

                  domain={[0, 5]}

                  label={{

                    value: "Rating",

                    angle: 90,

                    position: "insideRight"

                  }}

                />

                <Tooltip

                  cursor={{

                    stroke: "#60a5fa",

                    strokeWidth: 2,

                    strokeDasharray: "5 5"

                  }}

                  content={this.renderTooltip}

                />

                <Legend />

                <Bar

                  yAxisId="left"

                  dataKey="Total Reviews"

                  fill="url(#barGradient)"

                  radius={[12, 12, 0, 0]}

                />

                <Area

                  yAxisId="right"

                  type="monotone"

                  dataKey="Average Rating"

                  stroke="#22c55e"

                  fill="url(#reviewGradient)"

                  strokeWidth={4}

                />

              </ComposedChart>

            )}

          </ResponsiveContainer>

        </Card.Body>

      </Card>

    );

  }

}

export default MonthlyComparison;