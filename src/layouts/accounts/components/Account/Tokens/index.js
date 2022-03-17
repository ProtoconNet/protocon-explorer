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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DataTable from "examples/Tables/DataTable";

// Protocon Explorer utils
import { parseAmount } from "layouts/parse";

function Tokens({ tokens }) {
  const columns = [
    { Header: "currency", accessor: "currency", width: "30%", align: "left" },
    { Header: "amount", accessor: "amount", width: "70%", align: "right" },
  ];

  const rows = tokens.map((t) => ({
    currency: (
      <MDTypography
        variant="caption"
        color="link"
        fontWeight="regular"
        letterSpacing={1}
        component="a"
        href={`/token/${t.currency}`}
        target="_self"
        rel="noreferrer"
      >
        {t.currency}
      </MDTypography>
    ),
    amount: (
      <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={2}>
        {`${parseAmount(t.amount)} ${t.currency}`}
      </MDTypography>
    ),
  }));

  if (rows.length === 0) {
    rows.push({
      currency: (
        <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
          -
        </MDTypography>
      ),
      amount: (
        <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
          -
        </MDTypography>
      ),
    });
  }

  return (
    <MDBox p={3}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        flexDirection={{ xs: "column", sm: "row" }}
        mb={2}
      >
        <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
          Tokens
        </MDTypography>
      </MDBox>
      <DataTable table={{ columns, rows }} isSorted={false} noEndBorder />
    </MDBox>
  );
}

Tokens.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Tokens;
