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

// @mui material components
import { Card } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Protocon Explorer React layout components
import Raw from "layouts/raw";
import TokenOverview from "./TokenOverview";

const getTokenInfo = (cid) =>
  axios.get(
    `${[
      sessionStorage.getItem(process.env.REACT_APP_SESSION_KEY_NETWORK) ||
        process.env.REACT_APP_BLOCKCHAIN_NETWORK,
    ]}/currency/${cid}`
  );

class TokenInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      currency: "-",
      amount: "0",
      minBalance: "0",
      type: "-",
      fee: "-",
      receiver: "-",
      isShow: false,
      exchangeMinAmount: null,
      feefier: null,
      exchangecid: null,
      exchangeable: null,
    };

    this.loadInfo();
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

  loadInfo() {
    const parseType = (_hint) => {
      if (_hint.indexOf("fixed") >= 0) {
        return "fixed";
      }
      if (_hint.indexOf("ratio") >= 0) {
        return "ratio";
      }
      if (_hint.indexOf("feefi") >= 0) {
        return "feefi";
      }
      return "nil";
    };

    const { param } = this.props;
    getTokenInfo(param)
      .then((res) => {
        const info = res.data._embedded;
        const { currency, amount } = info.amount;
        const minBalance = info.policy.new_account_min_balance;
        const _type = parseType(info.policy.feeer._hint);
        const exchangeMinAmount = Object.prototype.hasOwnProperty.call(
          info.policy.feeer,
          "exchange-min-amount"
        )
          ? info.policy.feeer["exchange-min-amount"]
          : info.policy.feeer.exchangeminamount;
        let exchangeable = null;
        let exchangecid = null;
        let feefier = null;
        let fee;
        let receiver;

        switch (_type) {
          case "fixed":
            fee = info.policy.feeer.amount;
            receiver = info.policy.feeer.receiver;
            break;
          case "ratio":
            fee = info.policy.feeer.ratio;
            receiver = info.policy.feeer.receiver;
            break;
          case "feefi":
            fee = info.policy.feeer.amount;
            receiver = info.policy.feeer.receiver;
            exchangeable = info.policy.feeer.exchangeable;
            exchangecid = info.policy.feeer.exchangecid;
            feefier = info.policy.feeer.feefier;
            break;
          default:
            fee = "-";
            receiver = "-";
        }

        this.setState({
          data: res,
          currency,
          amount,
          minBalance,
          type: _type,
          fee,
          receiver,
          exchangeMinAmount,
          feefier,
          exchangecid,
          exchangeable,
        });
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(`Cannot load token information\n${e}`);
      });
  }

  render() {
    const {
      isShow,
      data,
      currency,
      amount,
      minBalance,
      type,
      receiver,
      fee,
      exchangeMinAmount,
      exchangeable,
      exchangecid,
      feefier,
    } = this.state;

    return isShow ? (
      <Raw data={data} onClick={() => this.handleShow()} />
    ) : (
      <MDBox py={5} px={1} mx={0.5}>
        <Card id="delete-account">
          <MDBox py={1} px={2}>
            <TokenOverview
              currency={currency}
              amount={amount}
              minBalance={minBalance}
              type={type}
              receiver={receiver}
              fee={fee}
              exchangeMinAmount={exchangeMinAmount}
              exchangeable={exchangeable}
              exchangecid={exchangecid}
              feefier={feefier}
              onClick={() => this.handleShow()}
            />
          </MDBox>
        </Card>
      </MDBox>
    );
  }
}

TokenInfo.propTypes = {
  param: PropTypes.string.isRequired,
};

export default TokenInfo;
