import { Navbar, Container } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import Logo from "../assets/images/logo.png";

function NavigationBar({ setShowSidebar }) {

  return (

    <Navbar className="custom-navbar">

      <Container fluid>

        <FaBars
          className="menu-icon"
          onClick={() => setShowSidebar(true)}
        />

        <Navbar.Brand className="sidebar-brand">

          <img
            src={Logo}
            alt="SentimentScope"
            className="sidebar-logo"
          />

          <span className="sidebar-title">
            SentimentScope
          </span>

        </Navbar.Brand>

      </Container>

    </Navbar>

  );

}

export default NavigationBar;