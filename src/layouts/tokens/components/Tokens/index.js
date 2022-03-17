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

// react component
import React, { Component } from "react";

// axios
import axios from "axios";

// @mui material components
import { Card, Grid } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React base styles
import colors from "assets/theme-dark/base/colors";

// Protocon Explorer React layout components
import Token from "../Token";

const getTokens = () =>
  axios.get(
    `${
      sessionStorage.getItem(process.env.REACT_APP_SESSION_KEY_NETWORK) ||
      process.env.REACT_APP_BLOCKCHAIN_NETWORK
    }/currency`
  );
const getTokenInfo = (cid) =>
  axios.get(
    `${
      sessionStorage.getItem(process.env.REACT_APP_SESSION_KEY_NETWORK) ||
      process.env.REACT_APP_BLOCKCHAIN_NETWORK
    }/currency/${cid}`
  );

function tokenTemplate(currency) {
  return {
    currency,
    amount: "0",
    fee: "-",
  };
}

class Tokens extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstGrid: [],
      secondGrid: [],
      thirdGrid: [],
    };

    getTokens()
      .then((res) => {
        // eslint-disable-next-line no-underscore-dangle
        const tokens = Object.keys(res.data._links)
          .map((t) => {
            const splitted = t.split(":");
            if (splitted.length === 2 && splitted[1] !== "{currencyid}") {
              return splitted[1];
            }
            return null;
          })
          .filter((t) => t)
          .map((t) => tokenTemplate(t));

        const fGrid = [];
        const sGrid = [];
        const tGrid = [];

        tokens.forEach((t, idx) => {
          getTokenInfo(t.currency).then((tRes) => {
            // eslint-disable-next-line no-underscore-dangle
            const info = tRes.data._embedded;
            const { amount } = info.amount;

            const token = {
              currency: t.currency,
              amount,
            };

            if (Object.prototype.hasOwnProperty.call(info.policy.feeer, "amount")) {
              token.fee = `${info.policy.feeer.amount}`;
            } else if (Object.prototype.hasOwnProperty.call(info.policy.feeer, "ratio")) {
              token.fee = `${info.policy.feeer.ratio}`;
            } else {
              token.fee = "-";
            }

            if (idx % 3 === 0) {
              fGrid.push(token);
              this.setState({
                firstGrid: [...fGrid],
              });
            } else if (idx % 3 === 1) {
              sGrid.push(token);
              this.setState({
                secondGrid: [...sGrid],
              });
            } else {
              tGrid.push(token);
              this.setState({
                thirdGrid: [...tGrid],
              });
            }
          });
        });
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(`Cannot load token information\n${e}`);
      });
  }

  render() {
    const { firstGrid, secondGrid, thirdGrid } = this.state;

    return (
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
            {firstGrid.map((t) => (
              <Token key={t.currency} currency={t.currency} amount={t.amount} fee={t.fee} />
            ))}
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            {secondGrid.map((t) => (
              <Token key={t.currency} currency={t.currency} amount={t.amount} fee={t.fee} />
            ))}
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            {thirdGrid.map((t) => (
              <Token key={t.currency} currency={t.currency} amount={t.amount} fee={t.fee} />
            ))}
          </Grid>
        </Grid>
      </MDBox>
    );
  }
}

export default Tokens;
