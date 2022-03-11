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

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import colors from "assets/theme-dark/base/colors";
import Node from "./Node";

function NodesDefault() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
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
                    Nodes
                  </MDTypography>
                </MDBox>
                <MDBox p={2} mx={1}>
                  <MDTypography variant="caption" fontWeight="medium" color="text">
                    network-01:CqjFcAqCC37Zpt6hns1yGaNCVGV7torsN9QxHDzCtVpz
                  </MDTypography>
                </MDBox>
              </Card>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <Node node="node01" address="https://127.0.0.1:12345" alive />
            <Node node="node03" address="https://127.0.0.1:12345" />
            <Node node="node01" address="https://127.0.0.1:12345" alive />
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <Node node="node03" address="https://127.0.0.1:12345" alive />
            <Node node="node01" address="https://127.0.0.1:12345" alive />
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <Node node="node03" address="https://127.0.0.1:12345" alive />
            <Node node="node01" address="https://127.0.0.1:12345" alive />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default NodesDefault;
