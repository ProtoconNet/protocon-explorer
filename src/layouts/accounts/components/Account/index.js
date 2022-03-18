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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// @mui material components
import { Card } from "@mui/material";

// Protocon Exaplorer React layout components
import Raw from "layouts/raw";
import AccountOverview from "./AccountOverview";
import Keys from "./Keys";
import Operations from "./Operations";
import Tokens from "./Tokens";
import Documents from "./Documents";

const getAccountInfo = (address) =>
  axios.get(
    `${sessionStorage.getItem(process.env.REACT_APP_SESSION_KEY_NETWORK)}/account/${address}`
  );

class AccountInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: false,
      data: null,
      keys: {
        threshold: 0,
        keys: [],
      },
      tokens: [],
    };

    this.loadAccountsInfo();
  }

  handleShow() {
    const { isShow } = this.state;
    if (isShow) {
      this.closeData();
    } else {
      this.openData();
    }
  }

  openData() {
    this.setState({ isShow: true });
  }

  closeData() {
    this.setState({ isShow: false });
  }

  loadAccountsInfo() {
    const { param } = this.props;

    getAccountInfo(param).then((res) => {
      const { threshold } = res.data._embedded.keys;
      const keys = res.data._embedded.keys.keys.map((k) => ({
        key: k.key,
        weight: k.weight,
      }));
      const tokens = res.data._embedded.balance.map((t) => ({
        currency: t.currency,
        amount: t.amount,
      }));

      this.setState({
        keys: {
          threshold,
          keys,
        },
        tokens,
        data: res.data,
      });
    });
  }

  render() {
    const { param } = this.props;
    const { isShow, data, keys, tokens } = this.state;

    return isShow ? (
      <Raw data={data} onClick={() => this.handleShow()} />
    ) : (
      <MDBox py={5} px={1} mx={0.5}>
        <Card id="delete-account">
          <MDBox pt={1} pb={2} px={2}>
            <AccountOverview address={param} onClick={() => this.handleShow()} />
          </MDBox>
          <MDBox py={1} px={2}>
            <Keys threshold={keys.threshold} keys={keys.keys} />
          </MDBox>
          <MDBox py={1} px={2}>
            <Tokens tokens={tokens} />
          </MDBox>
          <MDBox py={1} px={2}>
            <Operations address={param} />
          </MDBox>
          <MDBox py={1} px={2}>
            <Documents address={param} />
          </MDBox>
        </Card>
      </MDBox>
    );
  }
}

AccountInfo.propTypes = {
  param: PropTypes.string.isRequired,
};

export default AccountInfo;
