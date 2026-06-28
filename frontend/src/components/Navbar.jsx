import { Navbar, Container } from "react-bootstrap";
import { FaBars, FaChartLine } from "react-icons/fa";

function NavigationBar({ setShowSidebar }) {

  return (

    <Navbar className="custom-navbar">

      <Container fluid>

        <FaBars
          className="menu-icon"
          onClick={() => setShowSidebar(true)}
        />

        <Navbar.Brand
          className="fw-bold text-info fs-4 ms-3"
        >

          <FaChartLine className="me-2" /> SentimentScope

        </Navbar.Brand>

      </Container>

    </Navbar>

  );

}

export default NavigationBar;