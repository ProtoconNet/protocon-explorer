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

function TokenOverview({ currency, amount, minBalance, type, receiver, fee, noGutter, onClick }) {
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
            Token Overview
          </MDTypography>
          <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
            <MDButton variant="outlined" color={darkMode ? "white" : "dark"} onClick={onClick}>
              <Icon>data_object</Icon>&nbsp;raw
            </MDButton>
          </MDBox>
        </MDBox>
        <MDOverviewAttribute title="Currency ID" value={currency} />
        <MDOverviewAttribute title="Total Amount" value={amount} />
        <MDOverviewAttribute title="Minimal Balance for New Account" value={minBalance} />
        <MDOverviewAttribute title="Feeer Type" value={type} />
        <MDOverviewAttribute title="Receiver" value={receiver} />
        <MDOverviewAttribute title="Fee Amount/Ratio" value={fee} />
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Bill
TokenOverview.defaultProps = {
  noGutter: false,
  receiver: "-",
  fee: "-",
};

// Typechecking props for the Bill
TokenOverview.propTypes = {
  currency: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  minBalance: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  receiver: PropTypes.string,
  fee: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  noGutter: PropTypes.bool,
};

export default TokenOverview;
