import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/Dashboard.css";

import Dashboard from "./pages/Dashboard";
import Reviews from "./pages/Reviews";
import Analytics from "./pages/Analytics";

import Sidebar from "./components/Sidebar";
import NavigationBar from "./components/Navbar";

function App() {

  const [showSidebar, setShowSidebar] = useState(false);

  return (

    <Router>

      <Sidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />

      <div className="main-content">

        <NavigationBar
          setShowSidebar={setShowSidebar}
        />

        <div className="content-area">

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/reviews"
              element={<Reviews />}
            />
            <Route
              path="/analytics"
              element={<Analytics />}
            />

          </Routes>

        </div>

      </div>

    </Router>

  );

}

export default App;