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

// Material Dashboard React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// @mui material components
import { Card } from "@mui/material";

// Protocon Explorer utils
import { parseFee } from "layouts/parse";

function Token({ currency, fee }) {
  return (
    <MDBox key={currency} p={1} mx={0.5} my={1}>
      <Card>
        <MDBox
          component="a"
          href={`/token/${currency}`}
          target="_self"
          rel="noreferrer"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={3}
        >
          <MDBox display="flex" alignItems="center" p={1}>
            <MDBox mr={2}>
              <MDButton variant="gradient" color="dark" iconOnly circular>
                <MDTypography variant="gradient" color="text" textTransform="capitalize">
                  {currency.charAt(0)}
                </MDTypography>
              </MDButton>
            </MDBox>
            <MDBox display="flex" flexDirection="column">
              <MDTypography variant="button" fontWeight="medium" color="link" gutterBottom>
                {currency}
              </MDTypography>
              <MDTypography variant="button" color="info" fontWeight="regular" textGradient>
                {parseFee(fee, currency)}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </MDBox>
  );
}

Token.defaultProps = {
  fee: "-",
};

Token.propTypes = {
  currency: PropTypes.string.isRequired,
  fee: PropTypes.string,
};

export default Token;
