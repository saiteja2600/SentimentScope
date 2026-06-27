import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      className="shadow-sm"
      sticky="top"
    >
      <Container fluid>

        {/* <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-3 text-info"
        >
          📊 SentimentScope
        </Navbar.Brand> */}

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">

          <Nav className="me-auto">

            <Nav.Link as={Link} to="/">
              Dashboard
            </Nav.Link>

            <Nav.Link as={Link} to="/reviews">
              Reviews
            </Nav.Link>

            {/* <Nav.Link as={Link} to="/analytics">
                            Analytics
                        </Nav.Link>

                       */}

          </Nav>





        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default NavigationBar;