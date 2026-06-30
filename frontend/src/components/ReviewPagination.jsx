import React, { Component } from "react";
import { Pagination } from "react-bootstrap";

class ReviewPagination extends Component {
  render() {
    const {
      page,
      totalPages,
      onPageChange
    } = this.props;

    if (totalPages <= 1) {
      return null;
    }

    const maxPagesToShow = 5;

    let startPage = Math.max(
      1,
      page - Math.floor(maxPagesToShow / 2)
    );

    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(
        1,
        endPage - maxPagesToShow + 1
      );
    }

    const pageItems = [];

    for (let i = startPage; i <= endPage; i++) {
      pageItems.push(
        <Pagination.Item
          key={i}
          active={i === page}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    return (
      <Pagination className="justify-content-center mt-4">

        <Pagination.First
          disabled={page === 1}
          onClick={() => onPageChange(1)}
        />

        <Pagination.Prev
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        />

        {pageItems}

        <Pagination.Next
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        />

        <Pagination.Last
          disabled={page === totalPages}
          onClick={() => onPageChange(totalPages)}
        />

      </Pagination>
    );
  }
}

export default ReviewPagination;