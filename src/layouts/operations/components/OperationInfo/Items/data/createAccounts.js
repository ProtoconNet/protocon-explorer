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
import MDTypography from "components/MDTypography";

export default function data(content) {
  return {
    columns: [
      { Header: "account type", accessor: "type", width: "15%", align: "center" },
      { Header: "created account", accessor: "account", width: "85%", align: "left" },
    ],

    rows: content.map((item) => ({
      type: (
        <MDTypography variant="caption" color="warning" fontWeight="regular" letterSpacing={1}>
          {item.type}
        </MDTypography>
      ),
      account: (
        <MDTypography
          variant="caption"
          color="link"
          fontWeight="regular"
          letterSpacing={1}
          component="a"
          rel="noreferrer"
          target="_self"
          href={`/account/${item.account}`}
        >
          {item.account}
        </MDTypography>
      ),
    })),
  };
}
