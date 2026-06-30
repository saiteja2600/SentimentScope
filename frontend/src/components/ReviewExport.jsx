import { Component } from "react";

import {

  Dropdown,
  ButtonGroup,
  Button

} from "react-bootstrap";

import {

  FaFileExport,
  FaFileImport

} from "react-icons/fa";

import axios from "axios";

class ReviewExportImport extends Component {

  exportReviews = async (mode) => {

    try {

      const {

        page,
        limit,
        rating,
        startDate,
        endDate

      } = this.props;

      const response = await axios({

        url:
          "http://127.0.0.1:5000/api/export_reviews",

        method: "GET",

        params: {

          mode,

          page,

          limit,

          rating,

          start_date: startDate,

          end_date: endDate

        },

        responseType: "blob"

      });

      const url = window.URL.createObjectURL(

        new Blob([response.data])

      );

      const link = document.createElement("a");

      link.href = url;

      link.download = `reviews_${mode}.csv`;

      document.body.appendChild(link);

      link.click();

      link.remove();

    }

    catch (error) {

      console.log(error);

      alert("Unable to export.");

    }

  };

  render() {

    return (

      <div className="d-flex gap-2 justify-content-end">

        <Dropdown as={ButtonGroup} className="w-100">

          <Dropdown.Toggle
            variant="success"
            className="w-100"
          >

            <FaFileExport className="me-2" />

            Export

          </Dropdown.Toggle>

          <Dropdown.Menu>

            <Dropdown.Item
              onClick={() => this.exportReviews("current")}
            >
              Current Page
            </Dropdown.Item>

            <Dropdown.Item
              onClick={() => this.exportReviews("filtered")}
            >
              Filtered Records
            </Dropdown.Item>

            <Dropdown.Item
              onClick={() => this.exportReviews("all")}
            >
              All Reviews
            </Dropdown.Item>

          </Dropdown.Menu>

        </Dropdown>


      </div>

    );

  }

}

export default ReviewExportImport;