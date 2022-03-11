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

// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";

export default function data() {
  return {
    columns: [{ Header: "token", accessor: "token", width: "100%", align: "left" }],

    rows: [
      {
        token: (
          <MDTypography variant="caption" color="link" fontWeight="regular" letterSpacing={1}>
            PEN
          </MDTypography>
        ),
      },
      {
        token: (
          <MDTypography variant="caption" color="link" fontWeight="regular" letterSpacing={1}>
            MCC
          </MDTypography>
        ),
      },
      {
        token: (
          <MDTypography variant="caption" color="link" fontWeight="regular" letterSpacing={1}>
            CWC
          </MDTypography>
        ),
      },
    ],
  };
}
