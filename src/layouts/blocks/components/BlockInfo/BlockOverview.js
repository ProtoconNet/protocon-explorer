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
import MDButton from "components/MDButton";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

// @mui material components
import { Icon } from "@mui/material";

// Protocon Explorer React components
import PEOverviewAttribute from "components/PEOverviewAttribute";

function BlockOverview({ hash, height, created, confirmed, onClick }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            Block Overview
          </MDTypography>

          <MDBox display="flex" alignItems="center" ml={{ xs: -1.5, sm: 0 }}>
            <MDButton variant="outlined" color={darkMode ? "white" : "dark"} onClick={onClick}>
              <Icon>data_object</Icon>&nbsp;raw
            </MDButton>
          </MDBox>
        </MDBox>
        <PEOverviewAttribute title="Block Hash" value={hash} />
        <PEOverviewAttribute title="Block Height" value={height} />
        <PEOverviewAttribute title="Created At" value={created} />
        <PEOverviewAttribute title="Confirmed At" value={confirmed} />
      </MDBox>
    </MDBox>
  );
}

// Typechecking props for the Bill
BlockOverview.propTypes = {
  hash: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  created: PropTypes.string.isRequired,
  confirmed: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BlockOverview;
