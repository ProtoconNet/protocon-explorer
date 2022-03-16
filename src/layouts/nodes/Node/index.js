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
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// @mui material components
import { Card } from "@mui/material";

function Node({ node, address, alive }) {
  return (
    <MDBox key={node} p={1} mx={0.5} my={1}>
      <Card>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <MDBox display="flex" alignItems="center" p={1}>
            <MDBox mr={2}>
              <MDButton variant="gradient" color={alive ? "success" : "error"} iconOnly circular>
                <Icon>{alive ? "check_circle" : "error"}</Icon>
              </MDButton>
            </MDBox>
            <MDBox display="flex" flexDirection="column">
              <MDTypography variant="button" fontWeight="medium" gutterBottom>
                {node}
              </MDTypography>
              <MDTypography variant="caption" color="text" fontWeight="regular">
                {address}
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDTypography
            variant="button"
            color={alive ? "success" : "error"}
            fontWeight="medium"
            textGradient
          >
            {alive ? "active" : "dead"}
          </MDTypography>
        </MDBox>
      </Card>
    </MDBox>
  );
}

Node.defaultProps = {
  alive: false,
};

// Typechecking props of the Node
Node.propTypes = {
  node: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  alive: PropTypes.bool,
};

export default Node;
