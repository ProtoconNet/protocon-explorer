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

function Keys({ keys }) {
  const columns = [
    { Header: "public key", accessor: "key", width: "70%", align: "left" },
    { Header: "weight", accessor: "weight", width: "30%", align: "left" },
  ];

  const rows = keys.keys.map((k) => ({
    key: (
      <MDTypography
        variant="caption"
        color="link"
        fontWeight="regular"
        letterSpacing={1}
        component="a"
        href={`/accounts/${k.key}`}
        rel="noreferrer"
        target="_self"
      >
        {k.key}
      </MDTypography>
    ),
    weight: (
      <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
        {k.weight}
      </MDTypography>
    ),
  }));

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
          Keys (threshold: {keys.threshold})
        </MDTypography>
      </MDBox>
      <DataTable table={{ columns, rows }} isSorted={false} noEndBorder />
    </MDBox>
  );
}

Keys.propTypes = {
  keys: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
  ).isRequired,
};

export default Keys;
