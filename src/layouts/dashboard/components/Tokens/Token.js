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
import { parseAmount, parseFee } from "layouts/parse";

function Token({ currency, amount, fee, noGutter }) {
  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      pr={1}
      mb={noGutter ? 0 : 1}
    >
      <MDBox lineHeight={1.125}>
        <MDTypography
          display="block"
          variant="button"
          fontWeight="medium"
          letterSpacing={1}
          color="link"
          component="a"
          href={`/token/${currency}`}
          target="_self"
          rel="noreferrer"
        >
          {currency}
        </MDTypography>
        <MDTypography variant="caption" fontWeight="regular" color="text" letterSpacing={1}>
          {parseAmount(amount)}
        </MDTypography>
      </MDBox>
      <MDBox display="flex" alignItems="center">
        <MDTypography variant="caption" fontWeight="regular" color="info">
          {parseFee(fee)}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Invoice
Token.defaultProps = {
  fee: "-",
  noGutter: false,
};

// Typechecking props for the Invoice
Token.propTypes = {
  currency: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  fee: PropTypes.string,
  noGutter: PropTypes.bool,
};

export default Token;
