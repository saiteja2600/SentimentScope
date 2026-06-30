import React from "react";
import { Container } from "react-bootstrap";
import Logo from "../assets/images/logo.png";

const Footer = () => {

  return (

    <footer className="app-footer">

      <Container fluid>

        <div className="footer-content">

          <div className="footer-left">
            <img
              src={Logo}
              alt="SentimentScope"
              className="sidebar-logo"
            />
            <span className="sidebar-title">
              SentimentScope
            </span>
          </div>

          <div className="footer-center">
            © {new Date().getFullYear()} SentimentScope. All Rights Reserved.
          </div>

        </div>

      </Container>

    </footer>

  );

};

export default Footer;