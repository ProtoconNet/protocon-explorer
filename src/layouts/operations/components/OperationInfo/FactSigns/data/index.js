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
      { Header: "signer", accessor: "signer", width: "45%", align: "left" },
      { Header: "signature", accessor: "signature", width: "35%", align: "left" },
      { Header: "signed at", accessor: "signed", width: "20%", aling: "left" },
    ],

    rows: [
      {
        signer: (
          <MDTypography variant="caption" color="link" fontWeight="regular" letterSpacing={1}>
            bioYWEJCo62J4jzVxDLnedaQWZ4pqYXjwRHpky5iBJLzmpu
          </MDTypography>
        ),
        signature: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            381yXYhA2XgRcP4gQMxMekiPVVKVNMKfVR6PL9ReJLpJUbduC72P8NntRBJgZ5w8VqsueE3XMjC7qE9g97inbgjsxdJvGxZn
          </MDTypography>
        ),
        signed: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            2022-03-08T16:31:12.556Z
          </MDTypography>
        ),
      },
      {
        signer: (
          <MDTypography variant="caption" color="link" fontWeight="regular" letterSpacing={1}>
            bioYWEJCo62J4jzVxDLnedaQWZ4pqYXjwRHpky5iBJLzmpu
          </MDTypography>
        ),
        signature: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            381yXYhA2XgRcP4gQMxMekiPVVKVNMKfVR6PL9ReJLpJUbduC72P8NntRBJgZ5w8VqsueE3XMjC7qE9g97inbgjsxdJvGxZn
          </MDTypography>
        ),
        signed: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            2022-03-08T16:31:12.556Z
          </MDTypography>
        ),
      },
      {
        signer: (
          <MDTypography variant="caption" color="link" fontWeight="regular" letterSpacing={1}>
            bioYWEJCo62J4jzVxDLnedaQWZ4pqYXjwRHpky5iBJLzmpu
          </MDTypography>
        ),
        signature: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            381yXYhA2XgRcP4gQMxMekiPVVKVNMKfVR6PL9ReJLpJUbduC72P8NntRBJgZ5w8VqsueE3XMjC7qE9g97inbgjsxdJvGxZn
          </MDTypography>
        ),
        signed: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            2022-03-08T16:31:12.556Z
          </MDTypography>
        ),
      },
    ],
  };
}
