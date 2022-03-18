/* eslint-disable no-underscore-dangle */
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
// React components
import React, { Component } from "react";

// axios
import axios from "axios";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// @mui material components
import { Card, Grid } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React base styles
import colors from "assets/theme-dark/base/colors";

// Protocon Explorer React layout components
import Node from "./Node";

const getNodes = async () =>
  axios.get(
    sessionStorage.getItem(process.env.REACT_APP_SESSION_KEY_NETWORK) ||
      process.env.REACT_APP_BLOCKCHAIN_NETWORK
  );

class NodesDefault extends Component {
  constructor(props) {
    super(props);

    this.state = {
      networkVersion: "",
      firstGrid: [],
      secondGrid: [],
      thirdGrid: [],
    };

    this.loadNodes();
  }

  loadNodes() {
    getNodes()
      .then((res) => {
        const nV = res.data._embedded.version;
        const nN = res.data._embedded.suffrage.map((n) => ({
          node: n.address,
          address: n.conninfo ? n.conninfo.url : "-",
          alive: n.conninfo && true,
        }));

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

        this.setState({
          networkVersion: nV,
          firstGrid: [...fGrid],
          secondGrid: [...sGrid],
          thirdGrid: [...tGrid],
        });
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(`Cannot load network information\n${e}`);
      });
  }

  render() {
    const { networkVersion, firstGrid, secondGrid, thirdGrid } = this.state;

    return (
      <DashboardLayout>
        <DashboardNavbar
          placeHolder="block height / fact hash / account address / public key"
          redirectables={["block height", "fact hash", "account address", "public key"]}
        />
        <MDBox py={4}>
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
                    <MDTypography variant="caption" fontWeight="medium" color="text" hidden>
                      {networkVersion}
                    </MDTypography>
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              {firstGrid.map((x) => (
                <Node
                  key={`${networkVersion}-${x.node}`}
                  node={x.node}
                  address={x.address}
                  alive={x.alive}
                />
              ))}
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              {secondGrid.map((x) => (
                <Node
                  key={`${networkVersion}-${x.node}`}
                  node={x.node}
                  address={x.address}
                  alive={x.alive}
                />
              ))}
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              {thirdGrid.map((x) => (
                <Node
                  key={`${networkVersion}-${x.node}`}
                  node={x.node}
                  address={x.address}
                  alive={x.alive}
                />
              ))}
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }
}

export default NodesDefault;
