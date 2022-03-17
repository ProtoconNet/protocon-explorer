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

// Protocon Explorer React layout components
import Raw from "layouts/raw";
import BlockOverview from "./BlockOverview";
import Operations from "./Operations";

const getBlockInfo = (param) =>
  axios.get(
    `${
      sessionStorage.getItem(process.env.REACT_APP_SESSION_KEY_NETWORK) ||
      process.env.REACT_APP_BLOCKCHAIN_NETWORK
    }/block/${param}/manifest`
  );

class BlockInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hash: "-",
      height: "-1",
      created: "-",
      confirmed: "-",
      data: null,
      isShow: false,
    };

    this.loadBlockInfo();
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

  loadBlockInfo() {
    const { param } = this.props;

    getBlockInfo(param)
      .then((res) => {
        // eslint-disable-next-line no-underscore-dangle
        const block = res.data._embedded;
        this.setState({
          data: res.data,
          hash: block.hash,
          height: block.height,
          confirmed: block.confirmed_at.replace("T", ", ").replace("Z", ""),
          created: block.created_at.replace("T", ", ").replace("Z", ""),
        });
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(`Cannot load block information\n${e}`);
      });
  }

  render() {
    const { param } = this.props;
    const { isShow, data, hash, height, created, confirmed } = this.state;

    return isShow ? (
      <Raw data={data} onClick={() => this.handleShow()} />
    ) : (
      <MDBox py={5} px={1} mx={0.5}>
        <Card id="delete-account">
          <MDBox pt={1} pb={2} px={2}>
            <BlockOverview
              hash={hash}
              height={height}
              created={created}
              confirmed={confirmed}
              onClick={() => this.handleShow()}
            />
          </MDBox>
          <MDBox pt={1} pb={2} px={2}>
            <Operations param={param} />
          </MDBox>
        </Card>
      </MDBox>
    );
  }
}

BlockInfo.propTypes = {
  param: PropTypes.string.isRequired,
};

export default BlockInfo;
