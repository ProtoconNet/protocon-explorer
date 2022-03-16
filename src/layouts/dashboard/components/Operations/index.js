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

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DataTable from "examples/Tables/DataTable";

function Operations({ data }) {
  const { columns, rows } = data;

  return (
    <Card>
      <MDBox>
        <DataTable table={{ columns, rows }} isSorted={false} noEndBorder />
      </MDBox>
    </Card>
  );
}

Operations.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Operations;
