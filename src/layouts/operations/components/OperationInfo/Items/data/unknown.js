/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import MDTypography from "components/MDTypography";

export default function data() {
  return {
    columns: [
      { Header: "idx", accessor: "idx", width: "10%", align: "center" },
      { Header: "item type", accessor: "type", width: "90%", align: "left" },
    ],

    rows: [
      {
        idx: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            0
          </MDTypography>
        ),
        type: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            mitum-unknown
          </MDTypography>
        ),
      },
      {
        idx: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            0
          </MDTypography>
        ),
        type: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            mitum-unknown
          </MDTypography>
        ),
      },
      {
        idx: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            0
          </MDTypography>
        ),
        type: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            mitum-unknown
          </MDTypography>
        ),
      },
      {
        idx: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            0
          </MDTypography>
        ),
        type: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            mitum-unknown
          </MDTypography>
        ),
      },
    ],
  };
}
