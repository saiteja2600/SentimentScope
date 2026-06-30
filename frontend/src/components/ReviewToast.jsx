import React, { Component } from "react";
import {
  Toast,
  ToastContainer
} from "react-bootstrap";

class ReviewToast extends Component {
  render() {
    const {
      show,
      message,
      variant,
      onClose
    } = this.props;

    return (
      <ToastContainer
        className="p-3"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999
        }}
      >
        <Toast
          bg={variant}
          show={show}
          autohide
          delay={3000}
          onClose={onClose}
        >
          <Toast.Header>
            <strong className="me-auto">
              Notification
            </strong>
          </Toast.Header>

          <Toast.Body className="text-white">
            {message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    );
  }
}

export default ReviewToast;