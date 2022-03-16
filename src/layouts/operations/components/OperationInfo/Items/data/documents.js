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
      { Header: "document type", accessor: "type", width: "15%", align: "center" },
      { Header: "document id", accessor: "id", width: "30%", aling: "left" },
      { Header: "owner", accessor: "owner", width: "55%", align: "left" },
    ],

    rows: content.map((item) => ({
      type: (
        <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
          {item.type}
        </MDTypography>
      ),
      id: (
        <MDTypography
          variant="caption"
          color="link"
          fontWeight="regular"
          letterSpacing={1}
          component="a"
          target="_self"
          rel="noreferrer"
          href={`/document/${item.id}`}
        >
          {item.id}
        </MDTypography>
      ),
      owner: (
        <MDTypography
          variant="caption"
          color="link"
          fontWeight="regular"
          letterSpacing={1}
          component="a"
          target="_self"
          rel="noreferrer"
          href={`/account/${item.owner}`}
        >
          {item.owner}
        </MDTypography>
      ),
    })),
  };
}
