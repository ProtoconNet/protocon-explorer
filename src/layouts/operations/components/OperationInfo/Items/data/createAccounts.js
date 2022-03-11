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
      { Header: "account type", accessor: "type", width: "15%", align: "center" },
      { Header: "created account", accessor: "account", width: "85%", align: "left" },
    ],

    rows: [
      {
        type: (
          <MDTypography variant="caption" color="warning" fontWeight="regular" letterSpacing={1}>
            multi
          </MDTypography>
        ),
        account: (
          <MDTypography variant="caption" color="link" fontWeight="regular" letterSpacing={1}>
            bioYWEJCo62J4jzVxDLnedaQWZ4pqYXjwRHpky5iBJLzmca
          </MDTypography>
        ),
      },
      {
        type: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            single
          </MDTypography>
        ),
        account: (
          <MDTypography variant="caption" color="link" fontWeight="regular" letterSpacing={1}>
            bioYWEJCo62J4jzVxDLnedaQWZ4pqYXjwRHpky5iBJLzmca
          </MDTypography>
        ),
      },
      {
        type: (
          <MDTypography variant="caption" color="warning" fontWeight="regular" letterSpacing={1}>
            single
          </MDTypography>
        ),
        account: (
          <MDTypography variant="caption" color="link" fontWeight="regular" letterSpacing={1}>
            bioYWEJCo62J4jzVxDLnedaQWZ4pqYXjwRHpky5iBJLzmca
          </MDTypography>
        ),
      },
    ],
  };
}
