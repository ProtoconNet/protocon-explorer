/**
 * Copyright (c) 2022 Protocon Network. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */

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
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

export default function data(content) {
  return {
    columns: [
      { Header: "receiver", accessor: "receiver", width: "60%", align: "left" },
      { Header: "transfered", accessor: "token", width: "40%", align: "left" },
    ],

    rows: content.map((item) => ({
      receiver: (
        <MDTypography
          variant="caption"
          color="link"
          fontWeight="regular"
          letterSpacing={1}
          component="a"
          target="_self"
          rel="noreferrer"
          href={`/account/${item.receiver}`}
        >
          {item.receiver}
        </MDTypography>
      ),
      token: (
        <MDBox display="flex" flexDirection="row" justifyContent="center" align="center">
          <MDBox mr={1}>
            <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
              {item.amount}
            </MDTypography>
          </MDBox>
          <MDBox>
            <MDTypography
              variant="caption"
              color="link"
              fontWeight="regular"
              letterSpacing={1}
              component="a"
              target="_self"
              rel="noreferrer"
              href={`/token/${item.token}`}
            >
              {item.token}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
    })),
  };
}
