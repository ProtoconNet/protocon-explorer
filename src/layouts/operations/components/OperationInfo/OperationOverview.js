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

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import MDButton from "components/MDButton";

// @mui material components
import { Icon } from "@mui/material";

// Protocon Explorer React components
import PEOverviewAttribute from "components/PEOverviewAttribute";

function OperationOverview({
  type,
  hash,
  factHash,
  sender,
  target,
  confirmed,
  height,
  inState,
  reason,
  onClick,
}) {
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
            Operation Overview
          </MDTypography>

          <MDBox display="flex" alignItems="center" ml={{ xs: -1.5, sm: 0 }}>
            <MDButton variant="outlined" color={darkMode ? "white" : "dark"} onClick={onClick}>
              <Icon>data_object</Icon>&nbsp;raw
            </MDButton>
          </MDBox>
        </MDBox>
        <PEOverviewAttribute title="Opertion Type" value={type} />
        <PEOverviewAttribute title="Operation Hash" value={hash} />
        <PEOverviewAttribute title="Fact Hash" value={factHash} />
        {sender !== "-" ? (
          <PEOverviewAttribute title="Sender" value={sender} url={`/account/${sender}`} />
        ) : (
          false
        )}
        {target !== "-" ? (
          <PEOverviewAttribute title="Target" value={target} url={`/account/${target}`} />
        ) : (
          false
        )}
        <PEOverviewAttribute title="Confirmed At" value={confirmed} />
        <PEOverviewAttribute
          title="Block Height"
          value={height}
          url={height >= 0 ? `/block/${height}` : null}
        />
        <PEOverviewAttribute
          title="In State"
          value={inState ? "true" : "false"}
          color={inState ? "success" : "error"}
        />
        {reason && <PEOverviewAttribute title="Reason" value={reason} />}
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Bill
OperationOverview.defaultProps = {
  reason: "-",
  sender: "-",
  target: "-",
};

// Typechecking props for the Bill
OperationOverview.propTypes = {
  type: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  factHash: PropTypes.string.isRequired,
  sender: PropTypes.string,
  target: PropTypes.string,
  confirmed: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  inState: PropTypes.bool.isRequired,
  reason: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default OperationOverview;
