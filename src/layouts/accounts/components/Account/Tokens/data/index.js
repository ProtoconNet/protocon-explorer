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
      { Header: "currency", accessor: "currency", width: "30%", align: "left" },
      { Header: "amount", accessor: "amount", width: "70%", align: "right" },
    ],

    rows: [
      {
        currency: (
          <MDTypography variant="caption" color="link" fontWeight="regular" letterSpacing={1}>
            PEN
          </MDTypography>
        ),
        amount: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            100000000000.000000000000000000
          </MDTypography>
        ),
      },
      {
        currency: (
          <MDTypography variant="caption" color="link" fontWeight="regular" letterSpacing={1}>
            MCC
          </MDTypography>
        ),
        amount: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            100000000.000000000000000000
          </MDTypography>
        ),
      },
      {
        currency: (
          <MDTypography variant="caption" color="link" fontWeight="regular" letterSpacing={1}>
            CWG
          </MDTypography>
        ),
        amount: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            1000.000000000000000000
          </MDTypography>
        ),
      },
    ],
  };
}
