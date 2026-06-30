import React, { Component } from "react";
import { Container, Row, Col, Card, Placeholder } from "react-bootstrap";
import "../Styles/Pageloader.css"

class PageLoader extends Component {

  render() {

    const {
      cards = 3,
      charts = 2
    } = this.props;

    return (

      <Container fluid>

        {/* KPI Cards */}

        <Row className="mb-4">

          {[...Array(cards)].map((_, index) => (

            <Col
              lg={4}
              md={6}
              sm={12}
              className="mb-3"
              key={index}
            >

              <Card className="dashboard-card skeleton-card">

                <Card.Body>

                  <div className="card-content">

                    <div style={{ flex: 1 }}>

                      <Placeholder animation="glow">

                        <Placeholder xs={5} />

                      </Placeholder>

                      <br />

                      <Placeholder animation="glow">

                        <Placeholder xs={8} />

                      </Placeholder>

                    </div>

                    <div className="skeleton-icon"></div>

                  </div>

                </Card.Body>

              </Card>

            </Col>

          ))}

        </Row>

        {/* Chart Skeleton */}

        <Row>

          {[...Array(charts)].map((_, index) => (

            <Col
              lg={6}
              md={12}
              className="mb-4"
              key={index}
            >

              <Card className="analytics-card">

                <Card.Header>

                  <Placeholder animation="glow">

                    <Placeholder xs={4} />

                  </Placeholder>

                </Card.Header>

                <Card.Body>

                  <div className="chart-skeleton"></div>

                </Card.Body>

              </Card>

            </Col>

          ))}

        </Row>

      </Container>

    );

  }

}

export default PageLoader;