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

import { Card, Grid, Icon } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useMaterialUIController } from "context";
import MDButton from "components/MDButton";

function Raw({ data, onClick }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox mt={3}>
      <Card id="delete-account">
        <MDBox py={1} px={3}>
          <MDBox p={2} display="flex" justifyContent="space-between" alignItems="center">
            <MDTypography variant="h6" fontWeight="medium">
              Raw Data
            </MDTypography>

            <MDBox
              display="flex"
              alignItems="center"
              mt={{ xs: 2, sm: 0 }}
              ml={{ xs: -1.5, sm: 0 }}
            >
              <MDButton variant="outlined" color={darkMode ? "white" : "dark"} onClick={onClick}>
                <Icon>arrow_back_icon</Icon>&nbsp;back
              </MDButton>
            </MDBox>
          </MDBox>
          <MDBox p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <MDBox
                  borderRadius="lg"
                  p={3}
                  sx={{
                    border: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  }}
                >
                  <pre
                    style={{
                      fontSize: "0.8rem",
                      color: "white",
                      wordWrap: "break-all",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {JSON.stringify(data, null, 4)}
                  </pre>
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      </Card>
    </MDBox>
  );
}

Raw.propTypes = {
  data: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Raw;
