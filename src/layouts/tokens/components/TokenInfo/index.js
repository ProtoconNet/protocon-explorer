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
import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Raw from "layouts/raw";

import MDBox from "components/MDBox";
import { Card } from "@mui/material";
import TokenOverview from "./TokenOverview";

const getTokenInfo = (cid) =>
  axios.get(`${[process.env.REACT_APP_BLOCKCHAIN_NETWORK]}/currency/${cid}`);

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
      return "nil";
    };

    const { param } = this.props;
    getTokenInfo(param)
      .then((res) => {
        // eslint-disable-next-line no-underscore-dangle
        const info = res.data._embedded;
        const { currency, amount } = info.amount;
        const minBalance = info.policy.new_account_min_balance;
        // eslint-disable-next-line no-underscore-dangle
        const _type = parseType(info.policy.feeer._hint);
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
        });
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(`Cannot load token information\n${e}`);
      });
  }

  render() {
    const { isShow, data, currency, amount, minBalance, type, receiver, fee } = this.state;

    return isShow ? (
      <Raw data={data} onClick={() => this.handleShow()} />
    ) : (
      <MDBox pt={3} pb={6}>
        <Card id="delete-account">
          <MDBox p={2}>
            <TokenOverview
              noGutter={1}
              currency={currency}
              amount={amount}
              minBalance={minBalance}
              type={type}
              receiver={receiver}
              fee={fee}
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
