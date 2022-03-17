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

import React, { Component } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import axios from "axios";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// @mui material components
import { Card } from "@mui/material";

// Protocon Exaplorer utils
import { parseAmount } from "layouts/parse";

// Protocon Explorer React layout components
import Raw from "layouts/raw";
import OperationOverview from "./OperationOverview";
import Items from "./Items";
import Keys from "./Keys";
import Tokens from "./Tokens";
import FactSigns from "./FactSigns";

const getOperationInfo = (param) =>
  axios.get(
    `${
      sessionStorage.getItem(process.env.REACT_APP_SESSION_KEY_NETWORK) ||
      process.env.REACT_APP_BLOCKCHAIN_NETWORK
    }/block/operation/${param}`
  );

class OperationInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      type: "-",
      hash: "-",
      factHash: "-",
      sender: "-",
      confirmed: "-",
      height: -1,
      inState: true,
      reason: "",

      keys: null,
      tokens: [],
      factSigns: [],
      items: {
        type: "",
        arr: [],
      },

      isShow: false,
    };

    this.loadOperationInfo();
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
    this.setState({
      isShow: true,
    });
  }

  closeData() {
    this.setState({
      isShow: false,
    });
  }

  loadOperationInfo() {
    const { param } = this.props;

    const factSigns = (operation) => {
      if (!Object.prototype.hasOwnProperty.call(operation, "fact_signs")) {
        return [];
      }

      return operation.fact_signs.map((fs) => ({
        signer: fs.signer,
        signature: fs.signature,
        signed: fs.signed_at,
      }));
    };

    const keys = (fact) => {
      if (!Object.prototype.hasOwnProperty.call(fact, "keys")) {
        return null;
      }

      return {
        threshold: fact.keys.threshold,
        keys: fact.keys.keys.map((k) => ({
          key: k.key,
          weight: k.weight,
        })),
      };
    };

    const tokens = (fact) => {
      if (!Object.prototype.hasOwnProperty.call(fact, "amounts")) {
        return [];
      }

      return fact.amounts.map((amt) => ({
        currency: amt.currency,
        amount: amt.amount,
      }));
    };

    const items = (fact) => {
      if (!Object.prototype.hasOwnProperty.call(fact, "items")) {
        return null;
      }

      // eslint-disable-next-line no-underscore-dangle
      const idx = fact.items[0]._hint.indexOf(process.env.REACT_APP_BLOCKCHAIN_VERSION);
      // eslint-disable-next-line no-underscore-dangle
      const type = fact.items[0]._hint.substring(0, idx - 1);
      const arr = [];
      switch (type) {
        case process.env.REACT_APP_ITEM_CREATE_ACCOUNT:
        case process.env.REACT_APP_ITEM_CREATE_ACCOUNTS:
          return {
            type,
            arr: fact.items.map((item) => ({
              type: item.keys.keys.length > 1 ? "multi" : "single",
              account: `${item.keys.hash}mca`,
            })),
          };
        case process.env.REACT_APP_ITEM_TRANSFER:
        case process.env.REACT_APP_ITEM_TRANSFERS:
          for (let i = 0; i < fact.items.length; i += 1) {
            fact.items[i].amounts.forEach((amount) => {
              arr.push({
                receiver: fact.items[i].receiver,
                token: amount.currency,
                amount: parseAmount(amount.amount),
              });
            });
          }
          return {
            type,
            arr,
          };
        case process.env.REACT_APP_ITEM_CREATE_DOCUMENTS:
        case process.env.REACT_APP_ITEM_UPDATE_DOCUMENTS:
          return {
            type,
            arr: fact.items.map((item) => {
              const { doctype } = item.doc.info;
              let documentType = "UNKNOWN";
              if (doctype.indexOf("user-data") >= 0) {
                documentType = "BC-USER";
              }
              if (doctype.indexOf("land-data") >= 0) {
                documentType = "BC-LAND";
              }
              if (doctype.indexOf("voting-data") >= 0) {
                documentType = "BC-VOTE";
              }
              if (doctype.indexOf("history-data") >= 0) {
                documentType = "BC-HISTORY";
              }
              if (doctype.indexOf("blocksign") >= 0) {
                documentType = "BS";
              }
              return {
                type: documentType,
                id: item.doc.info.docid.id,
                owner: item.doc.owner,
              };
            }),
          };
        case process.env.REACT_APP_ITEM_SIGN_DOCUMENTS:
          return {
            type,
            arr: fact.items.map((item) => ({
              type: "BS",
              id: item.documentid,
              owner: item.owner,
            })),
          };
        default:
          return {
            type,
            arr: fact.items.map((_, i) => ({
              idx: i,
              type,
            })),
          };
      }
    };

    getOperationInfo(param)
      .then((res) => {
        // eslint-disable-next-line no-underscore-dangle
        const { operation } = res.data._embedded;
        // eslint-disable-next-line no-underscore-dangle
        const operationType = operation._hint;
        const idx = operationType.indexOf(process.env.REACT_APP_BLOCKCHAIN_VERSION);

        this.setState({
          data: res.data,
          type: operationType.substring(0, idx - 1),
          hash: operation.hash,
          factHash: operation.fact.hash,
          sender: Object.prototype.hasOwnProperty.call(operation.fact, "sender")
            ? operation.fact.sender
            : "-",
          // eslint-disable-next-line no-underscore-dangle
          confirmed: res.data._embedded.confirmed_at.replace("T", ", ").replace("Z", ""),
          // eslint-disable-next-line no-underscore-dangle
          height: res.data._embedded.height,
          // eslint-disable-next-line no-underscore-dangle
          inState: res.data._embedded.in_state,
          // eslint-disable-next-line no-underscore-dangle
          reason: res.data._embedded.reason,
          factSigns: factSigns(operation),
          keys: keys(operation.fact),
          tokens: tokens(operation.fact),
          items: items(operation.fact),
        });
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(`Cannot load operation information\n${e}`);
      });
  }

  render() {
    const {
      isShow,
      data,
      type,
      hash,
      factHash,
      sender,
      confirmed,
      height,
      inState,
      reason,
      factSigns,
      keys,
      tokens,
      items,
    } = this.state;

    return isShow ? (
      <Raw data={data} onClick={() => this.handleShow()} />
    ) : (
      <MDBox py={5} px={1} mx={0.5}>
        <Card id="delete-Operation">
          <MDBox pt={1} pb={2} px={2}>
            <OperationOverview
              type={type}
              hash={hash}
              factHash={factHash}
              sender={sender}
              confirmed={confirmed}
              height={height}
              inState={inState}
              reason={reason}
              onClick={() => this.handleShow()}
            />
          </MDBox>
          {keys && (
            <MDBox py={1} px={2}>
              <Keys keys={keys} />
            </MDBox>
          )}
          {tokens.length > 0 && (
            <MDBox py={1} px={2}>
              <Tokens tokens={tokens} />
            </MDBox>
          )}
          {factSigns.length > 0 && (
            <MDBox py={1} px={2}>
              <FactSigns factSigns={factSigns} />
            </MDBox>
          )}
          {items && (
            <MDBox py={1} px={2}>
              <Items type={items.type} content={items.arr} />
            </MDBox>
          )}
        </Card>
      </MDBox>
    );
  }
}

OperationInfo.propTypes = {
  param: PropTypes.string.isRequired,
};

export default OperationInfo;
