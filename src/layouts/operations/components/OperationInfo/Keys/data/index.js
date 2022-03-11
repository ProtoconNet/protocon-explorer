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
      { Header: "public key", accessor: "key", width: "70%", align: "left" },
      { Header: "weight", accessor: "weight", width: "30%", align: "left" },
    ],

    rows: [
      {
        key: (
          <MDTypography variant="caption" color="link" fontWeight="regular" letterSpacing={1}>
            3GMs4G9CumofwBGknwe4w8ddBBBLsoznqxaYoqzZBjv3
          </MDTypography>
        ),
        weight: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            100
          </MDTypography>
        ),
      },
      {
        key: (
          <MDTypography variant="caption" color="link" fontWeight="regular" letterSpacing={1}>
            3GMs4G9CumofwBGknwe4w8ddBBBLsoznqxaYoqzZBjv3
          </MDTypography>
        ),
        weight: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            90
          </MDTypography>
        ),
      },
      {
        key: (
          <MDTypography variant="caption" color="link" fontWeight="regular" letterSpacing={1}>
            3GMs4G9CumofwBGknwe4w8ddBBBLsoznqxaYoqzZBjv3
          </MDTypography>
        ),
        weight: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            80
          </MDTypography>
        ),
      },
    ],
  };
}
