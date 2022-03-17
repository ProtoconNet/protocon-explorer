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
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Billing page components
import Node from "./Node";

function Nodes({ network, nodes }) {
  const renderNodes = () => {
    const renderedNodes =
      nodes &&
      nodes.map((x) => <Node key={x.node} node={x.node} address={x.address} alive={x.alive} />);

    const nd = network;

    return (
      <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
        <MDBox
          component="li"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py={1}
          pr={1}
          mb={1}
        >
          <MDBox>
            <MDTypography display="block" variant="button" fontWeight="medium" hidden>
              {nd || "network not found"}
            </MDTypography>
          </MDBox>
        </MDBox>
        {renderedNodes}
      </MDBox>
    );
  };

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Nodes
        </MDTypography>
        <MDButton
          variant="outlined"
          color="info"
          size="small"
          component="a"
          href="/nodes"
          target="_self"
          rel="noreferrer"
        >
          view all
        </MDButton>
      </MDBox>
      <MDBox p={2}>{renderNodes()}</MDBox>
    </Card>
  );
}

Nodes.defaultProps = {
  network: "network not found",
  nodes: [],
};

Nodes.propTypes = {
  network: PropTypes.string,
  nodes: PropTypes.arrayOf(PropTypes.object),
};

export default Nodes;
