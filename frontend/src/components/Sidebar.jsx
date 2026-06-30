import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaComments,
  FaTimes,
  FaLayerGroup,
  FaChartLine
} from "react-icons/fa";
import Logo from "../assets/images/logo.png";

function Sidebar({

  showSidebar,
  setShowSidebar

}) {

  return (

    <div
      className={
        showSidebar
          ? "sidebar active"
          : "sidebar"
      }
    >

      <div className="sidebar-header">

        <FaTimes
          className="close-icon"
          onClick={() => setShowSidebar(false)}
        />

        <div className="sidebar-brand">

          <div className="sidebar-brand">

            <img
              src={Logo}
              alt="SentimentScope"
              className="sidebar-logo"
            />

            <h3 className="sidebar-title">
              SentimentScope
            </h3>

          </div>
        </div>

      </div>

      <Nav className="flex-column">

        <Nav.Link as={NavLink} to="/" end className="sidebar-link" onClick={() => setShowSidebar(false)}>
          <FaTachometerAlt className="me-2" />Dashboard </Nav.Link>

        <Nav.Link as={NavLink} to="/reviews" className="sidebar-link" onClick={() => setShowSidebar(false)}>

          <FaComments className="me-2" /> Reviews </Nav.Link>

        <Nav.Link as={NavLink} to="/analytics" className="sidebar-link" onClick={() => setShowSidebar(false)}>

          <FaLayerGroup className="me-2" /> Analytics </Nav.Link>

      </Nav>

    </div>

  );

}

export default Sidebar;