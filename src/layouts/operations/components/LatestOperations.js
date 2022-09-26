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

// @mui material components
import { Card, Grid } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React base styles
import colors from "assets/theme-dark/base/colors";

// Material Dashboard 2 React example components
import WideDataTable from "examples/Tables/WideDataTable";

// Protocon Explorer React components
import PETextItem from "components/PETextItem";

const getOperations = () =>
  axios.get(
    `${
      sessionStorage.getItem(process.env.REACT_APP_SESSION_KEY_NETWORK) ||
      process.env.REACT_APP_BLOCKCHAIN_NETWORK
    }/block/operations?reverse=1`
  );

const getMore = (next) =>
  axios.get(
    `${
      sessionStorage.getItem(process.env.REACT_APP_SESSION_KEY_NETWORK) ||
      process.env.REACT_APP_BLOCKCHAIN_NETWORK
    }${next}`
  );

class LatestOperations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      operations: [],
      next: "",
    };

    this.loadOperations();
  }

  loadOperations() {
    getOperations()
      .then((res) => {
        const operations = res.data._embedded.map((o) => ({
          hash: o._embedded.operation.fact.hash,
          confirmed: o._embedded.confirmed_at.replace("T", ", ").replace("Z", ""),
          height: o._embedded.height,
        }));

        this.setState({
          operations,
          next: res.data._links.next.href,
        });
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(`Cannot load operations\n${e}`);
      });
  }

  loadMore() {
    const { next } = this.state;

    getMore(next)
      .then((res) => {
        const additional = res.data._embedded.map((o) => ({
          hash: o._embedded.operation.fact.hash,
          confirmed: o._embedded.confirmed_at.replace("T", ", ").replace("Z", ""),
          height: o._embedded.height,
        }));

        const { operations } = this.state;
        this.setState({
          operations: [...operations, ...additional],
          next: res.data._links.next.href,
        });
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(`No more operations\n${e}`);
        this.setState({
          next: "",
        });
      });
  }

  render() {
    const columns = [
      { Header: "fact hash", accessor: "hash", width: "60%", align: "left" },
      { Header: "confirmed at", accessor: "confirmed", width: "25%", align: "left" },
      { Header: "block height", accessor: "height", width: "15%", align: "left" },
    ];

    const { next, operations } = this.state;
    const rows = operations.map((o) => ({
      hash: <PETextItem content={o.hash} href={`/operation/${o.hash}`} />,
      height: <PETextItem content={o.height} href={`/block/${o.height}`} />,
      confirmed: <PETextItem content={o.confirmed} />,
    }));

    if (rows.length === 0) {
      rows.push({
        hash: <PETextItem content="-" />,
        height: <PETextItem content="-" />,
        date: <PETextItem content="-" />,
      });
    }

    return (
      <MDBox py={4}>
        <Grid container spacing={6}>
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
                    Latest Operations
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <WideDataTable table={{ columns, rows }} isSorted={false} noEndBorder />
                </MDBox>
              </Card>
            </MDBox>
          </Grid>
        </Grid>
        {next && operations.length >= 10 && (
          <Grid container spacing={6}>
            <Grid item mt={2} xs={12}>
              <MDButton
                variant="outlined"
                color="info"
                size="small"
                onClick={() => this.loadMore()}
                fullWidth
              >
                view more
              </MDButton>
            </Grid>
          </Grid>
        )}
      </MDBox>
    );
  }
}

export default LatestOperations;
