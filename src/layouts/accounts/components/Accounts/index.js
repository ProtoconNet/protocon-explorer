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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import { Card, Grid } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import WideDataTable from "examples/Tables/WideDataTable";

// Material Dashboard 2 React base styles
import colors from "assets/theme-dark/base/colors";

const getAccounts = (key) =>
  axios.get(
    `${
      sessionStorage.getItem("network") || process.env.REACT_APP_BLOCKCHAIN_NETWORK
    }/accounts?publickey=${key}`
  );

const getMore = (next) =>
  axios.get(
    `${sessionStorage.getItem("network") || process.env.REACT_APP_BLOCKCHAIN_NETWORK}${next}`
  );

class Accounts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
      next: "",
    };

    this.loadAccounts();
  }

  loadAccounts() {
    const { param } = this.props;
    if (!param) {
      return;
    }

    getAccounts(param)
      .then((res) => {
        // eslint-disable-next-line no-underscore-dangle
        const accounts = res.data._embedded.map((acc) => acc._embedded.address);
        this.setState({
          accounts,
          // eslint-disable-next-line no-underscore-dangle
          next: accounts.length >= 10 ? res.data._links.next.href : "",
        });
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(`Cannot load accounts\n${e}`);
      });
  }

  loadMore() {
    const { next } = this.state;

    if (next) {
      getMore(next)
        .then((res) => {
          const { accounts } = this.state;
          // eslint-disable-next-line no-underscore-dangle
          const additional = res.data._embedded.map((acc) => acc._embedded.address);
          this.setState({
            accounts: [...accounts, additional],
            // eslint-disable-next-line no-underscore-dangle
            next: res.data._links.next.href,
          });
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.error(`No more accounts/n${e}`);
          this.setState({
            next: "",
          });
        });
    }
  }

  render() {
    const { accounts, next } = this.state;
    const { param } = this.props;
    const columns = [{ Header: "address", accessor: "address", width: "100%", align: "left" }];
    const rows = accounts.map((acc) => ({
      address: (
        <MDTypography
          variant="caption"
          color="link"
          fontWeight="regular"
          letterSpacing={1}
          component="a"
          href={`/account/${acc}`}
          target="_self"
          rel="noreferrer"
        >
          {acc}
        </MDTypography>
      ),
    }));

    if (rows.length < 10) {
      const len = rows.length;
      for (let i = 0; i < 10 - len; i += 1) {
        rows.push({
          address: (
            <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
              -
            </MDTypography>
          ),
        });
      }
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
                    Accounts
                  </MDTypography>
                </MDBox>
                <MDBox mt={0.5} mx={3} p={1}>
                  <MDTypography variant="caption" color="text" letterSpacing={1} hidden>
                    Public Key: {param || "..."}
                  </MDTypography>
                </MDBox>
                <MDBox pt={1}>
                  <WideDataTable table={{ columns, rows }} isSorted={false} noEndBorder />
                </MDBox>
              </Card>
            </MDBox>
          </Grid>
        </Grid>
        {next && accounts.length >= 10 && (
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

Accounts.propTypes = {
  param: PropTypes.string.isRequired,
};

export default Accounts;
