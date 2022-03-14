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
import { useState } from "react";
import axios from "axios";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import colors from "assets/theme-dark/base/colors";
import Node from "./Node";

const getNodes = async () => axios.get(process.env.REACT_APP_BLOCKCHAIN_NETWORK);

function NodesDefault() {
  const [networkVersion, setNetworkVersion] = useState("");
  const [firstGrid, setFirstGrid] = useState([]);
  const [secondGrid, setSecodeGrid] = useState([]);
  const [thirdGrid, setThirdGrid] = useState([]);

  getNodes()
    .then((res) => {
      // eslint-disable-next-line no-underscore-dangle
      const nV = res.data._embedded.version;
      // eslint-disable-next-line no-underscore-dangle
      const nN = res.data._embedded.suffrage.map((n) => ({
        node: n.address,
        address: n.conninfo ? n.conninfo.url : "-",
        alive: n.conninfo && true,
      }));

      setNetworkVersion(nV);

      const fGrid = [];
      const sGrid = [];
      const tGrid = [];

      nN.forEach((n, idx) => {
        if (idx % 3 === 0) {
          fGrid.push(n);
        } else if (idx % 3 === 1) {
          sGrid.push(n);
        } else {
          tGrid.push(n);
        }
      });

      setFirstGrid([...fGrid]);
      setSecodeGrid([...sGrid]);
      setThirdGrid([...tGrid]);
    })
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.error(`Cannot load network information\n${e}`);
    });

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
                    {networkVersion}
                  </MDTypography>
                </MDBox>
              </Card>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            {firstGrid.map((x) => (
              <Node key={x.node} node={x.node} address={x.address} alive={x.alive} />
            ))}
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            {secondGrid.map((x) => (
              <Node key={x.node} node={x.node} address={x.address} alive={x.alive} />
            ))}
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            {thirdGrid.map((x) => (
              <Node key={x.node} node={x.node} address={x.address} alive={x.alive} />
            ))}
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default NodesDefault;
