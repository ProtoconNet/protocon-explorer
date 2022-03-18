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

function GenesisNodeKey({ genesisNodeKey }) {
  return (
    <MDBox p={3}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        flexDirection={{ xs: "column", sm: "row" }}
        mb={1}
      >
        <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
          Genesis Node Key
        </MDTypography>
      </MDBox>
      <MDTypography
        variant="caption"
        fontWeight="regular"
        color="link"
        component="a"
        href={`/accounts/${genesisNodeKey}`}
        target="_self"
        rel="noreferrer"
        hidden
      >
        {genesisNodeKey}
      </MDTypography>
    </MDBox>
  );
}

GenesisNodeKey.propTypes = {
  genesisNodeKey: PropTypes.string.isRequired,
};

export default GenesisNodeKey;
