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

import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function Token({ currency, amount, feeer }) {
  let fee;

  switch (feeer.feeer) {
    case "nil":
      fee = "-";
      break;
    case "fixed":
      fee = `${feeer.amount} T`;
      break;
    case "ratio":
      fee = `${feeer.ratio * 100} %`;
      break;
    default:
      fee = "?";
  }

  return (
    <MDBox key={currency} p={1} mx={0.5} my={1}>
      <Card>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
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
              <MDTypography variant="caption" color="text" fontWeight="regular">
                {amount}
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDTypography variant="button" color="info" fontWeight="medium" textGradient>
            {fee}
          </MDTypography>
        </MDBox>
      </Card>
    </MDBox>
  );
}

Token.defaultProps = {
  amount: 0,
  feeer: { feeer: "not loaded" },
};

Token.propTypes = {
  currency: PropTypes.string.isRequired,
  amount: PropTypes.number,
  feeer: PropTypes.oneOfType(PropTypes.object),
};

export default Token;
