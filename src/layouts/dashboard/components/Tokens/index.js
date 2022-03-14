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

import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Billing page components
import Token from "./Token";

function Tokens({ tokens }) {
  const renderTokens = () => (
    <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
      {tokens.map((x) => (
        <Token currency={x.currency} amount={x.amount} fee={x.fee} />
      ))}
    </MDBox>
  );

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Tokens
        </MDTypography>
        <MDButton
          variant="outlined"
          color="info"
          size="small"
          component="a"
          href="/tokens"
          target="_self"
          rel="noreferrer"
        >
          view all
        </MDButton>
      </MDBox>
      <MDBox p={2}>{renderTokens()}</MDBox>
    </Card>
  );
}

Tokens.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Tokens;
