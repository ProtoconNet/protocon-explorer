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

// Protocon Explorer utils
import { parseFee } from "layouts/parse";

function Token({ currency, fee }) {
  return (
    <MDBox
      component="li"
      display="flex"
      flexDirection={{ xs: "row", lg: "column" }}
      justifyContent="space-between"
      alignItems="start"
      py={1.42}
    >
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
      <MDBox opacity={0.7}>
        <MDBox display="flex" flexDirection="row" justifyContent="space-between" alignItems="start">
          <MDTypography variant="caption" fontWeight="medium">
            Fee&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </MDTypography>
          <MDTypography variant="caption" fontWeight="regular" letterSpacing={1}>
            {parseFee(fee, currency)}
          </MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Invoice
Token.defaultProps = {
  fee: "-",
};

// Typechecking props for the Invoice
Token.propTypes = {
  currency: PropTypes.string.isRequired,
  fee: PropTypes.string,
};

export default Token;
