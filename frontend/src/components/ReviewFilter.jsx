import React, { Component } from "react";
import {
  Row,
  Col,
  Form,
  Button
} from "react-bootstrap";

import ReviewExportImport from "./ReviewExport";

class ReviewFilter extends Component {
  render() {
    const {
      page,
      limit,
      rating,
      startDate,
      endDate,
      setLimit,
      setRating,
      setStartDate,
      setEndDate,
      onFilter,
    } = this.props;

    return (
      <Row className="mb-4 align-items-center g-2">

        <Col lg={1} md={6} sm={12}>
          <Form.Group>
            <Form.Label className="filter-label">
              Rows
            </Form.Label>

            <Form.Select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col lg={2} md={6} sm={12}>
          <Form.Group>
            <Form.Label className="filter-label">
              Rating
            </Form.Label>

            <Form.Select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="">All Ratings</option>
              <option value="5">★★★★★</option>
              <option value="4">★★★★☆</option>
              <option value="3">★★★☆☆</option>
              <option value="2">★★☆☆☆</option>
              <option value="1">★☆☆☆☆</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col lg={2} md={6} sm={12}>
          <Form.Group>
            <Form.Label className="filter-label">
              Start Date
            </Form.Label>

            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col lg={2} md={6} sm={12}>
          <Form.Group>
            <Form.Label className="filter-label">
              End Date
            </Form.Label>

            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col lg={1} md={6} sm={6}>
          <Form.Group>
            <Form.Label className="filter-label">
              &nbsp;
            </Form.Label>

            <Button
              variant="primary"
              className="w-100"
              onClick={onFilter}
            >
              Filter
            </Button>
          </Form.Group>
        </Col>

        <Col lg={2} md={4} sm={12}>
          <Form.Group>
            <Form.Label className="filter-label">
              &nbsp;
            </Form.Label>

            <ReviewExportImport
              page={page}
              limit={limit}
              rating={rating}
              startDate={startDate}
              endDate={endDate}
            />
          </Form.Group>
        </Col>

      </Row>
    );
  }
}

export default ReviewFilter;