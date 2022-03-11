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
      { Header: "receiver", accessor: "receiver", width: "60%", align: "left" },
      { Header: "transfered", accessor: "token", width: "40%", align: "right" },
    ],

    rows: [
      {
        receiver: (
          <MDTypography variant="caption" color="link" fontWeight="regular" letterSpacing={1}>
            bioYWEJCo62J4jzVxDLnedaQWZ4pqYXjwRHpky5iBJLzmca
          </MDTypography>
        ),
        token: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            1000000.0000 PEN
          </MDTypography>
        ),
      },
      {
        receiver: (
          <MDTypography variant="caption" color="link" fontWeight="regular" letterSpacing={1}>
            bioYWEJCo62J4jzVxDLnedaQWZ4pqYXjwRHpky5iBJLzmca
          </MDTypography>
        ),
        token: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            1000000.0000 PEN
          </MDTypography>
        ),
      },
      {
        receiver: (
          <MDTypography variant="caption" color="link" fontWeight="regular" letterSpacing={1}>
            bioYWEJCo62J4jzVxDLnedaQWZ4pqYXjwRHpky5iBJLzmca
          </MDTypography>
        ),
        token: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            10000.0000 MCC
          </MDTypography>
        ),
      },
      {
        receiver: (
          <MDTypography variant="caption" color="link" fontWeight="regular" letterSpacing={1}>
            bioYWEJCo62J4jzVxDLnedaQWZ4pqYXjwRHpky5iBJLzmca
          </MDTypography>
        ),
        token: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            1000000.0000 CWG
          </MDTypography>
        ),
      },
    ],
  };
}
