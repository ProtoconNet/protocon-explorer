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
import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import colors from "assets/theme-dark/base/colors";
import Token from "../Token";

function Tokens() {
  return (
    <MDBox py={3}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <MDBox p={1} mx={0.5}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={2}
                px={2}
                variant="contained"
                bgColor="transparent"
                borderRadius="lg"
                coloredShadow="info"
                border={`1px solid ${colors.info.main}`}
              >
                <MDTypography variant="h6" color="white">
                  Registed Tokens
                </MDTypography>
              </MDBox>
              <MDBox p={2} mx={1}>
                <MDTypography variant="caption" fontWeight="medium" color="text">
                  {" "}
                </MDTypography>
              </MDBox>
            </Card>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <Token currency="PEN" amount={100000000.0} feeer={{ feeer: "nil" }} />
          <Token currency="CWG" amount={900003330.0} feeer={{ feeer: "ratio", ratio: 0.01 }} />
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <Token currency="MCC" amount={1000000.0} feeer={{ feeer: "fixed", amount: 10.0 }} />
          <Token currency="CWG" amount={900003330.0} feeer={{ feeer: "fixed", amount: 1.0 }} />
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <Token currency="CWG" amount={900003330.0} feeer={{ feeer: "ratio", ratio: 0.1 }} />
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Tokens;
