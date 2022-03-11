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
import { Icon } from "@mui/material";
import MDOverviewAttribute from "components/MDOverviewAttribute";

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
  noGutter,
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
      pt={3}
      pl={3}
      pr={3}
      mb={noGutter ? 0 : 1}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            Operation Overview
          </MDTypography>

          <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
            <MDButton variant="outlined" color={darkMode ? "white" : "dark"} onClick={onClick}>
              <Icon>data_object</Icon>&nbsp;raw
            </MDButton>
          </MDBox>
        </MDBox>
        <MDOverviewAttribute title="Opertion Type" value={type} />
        <MDOverviewAttribute title="Operation Hash" value={hash} />
        <MDOverviewAttribute title="Fact Hash" value={factHash} />
        {sender !== "-" ? (
          <MDOverviewAttribute title="Sender" value={sender} onClick={() => {}} link />
        ) : (
          false
        )}
        {target !== "-" ? (
          <MDOverviewAttribute title="Target" value={target} onClick={() => {}} link />
        ) : (
          false
        )}
        <MDOverviewAttribute title="Confirmed At" value={confirmed} />
        <MDOverviewAttribute title="Block Height" value={height} onClick={() => {}} link />
        <MDOverviewAttribute
          title="In State"
          value={inState ? "true" : "false"}
          color={inState ? "success" : "error"}
        />
        {reason !== "-" ? <MDOverviewAttribute title="Reason" value={reason} /> : false}
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Bill
OperationOverview.defaultProps = {
  noGutter: false,
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
  noGutter: PropTypes.bool,
};

export default OperationOverview;
