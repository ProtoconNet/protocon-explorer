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
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DataTable from "examples/Tables/DataTable";

const getOperations = (param) =>
  axios.get(
    `${
      sessionStorage.getItem(process.env.REACT_APP_SESSION_KEY_NETWORK) ||
      process.env.REACT_APP_BLOCKCHAIN_NETWORK
    }/block/${param}/operations?reverse=1`
  );
const getMore = (next) =>
  axios.get(
    `${
      sessionStorage.getItem(process.env.REACT_APP_SESSION_KEY_NETWORK) ||
      process.env.REACT_APP_BLOCKCHAIN_NETWORK
    }${next}`
  );

class Operations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      operations: [],
      next: "",
    };

    this.loadOperations();
  }

  loadOperations() {
    const { param } = this.props;
    getOperations(param)
      .then((res) => {
        // eslint-disable-next-line no-underscore-dangle
        const operations = res.data._embedded.map((o) => ({
          // eslint-disable-next-line no-underscore-dangle
          hash: o._embedded.operation.fact.hash,
          // eslint-disable-next-line no-underscore-dangle
          height: o._embedded.height,
          // eslint-disable-next-line no-underscore-dangle
          confirmed: o._embedded.confirmed_at.replace("T", ", ").replace("Z", ""),
        }));

        this.setState({
          operations,
          // eslint-disable-next-line no-underscore-dangle
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
    if (next) {
      getMore(next)
        .then((res) => {
          // eslint-disable-next-line no-underscore-dangle
          const additional = res.data._embedded.map((o) => ({
            // eslint-disable-next-line no-underscore-dangle
            hash: o._embedded.operation.fact.hash,
            // eslint-disable-next-line no-underscore-dangle
            height: o._embedded.height,
            // eslint-disable-next-line no-underscore-dangle
            confirmed: o._embedded.confirmed_at.replace("T", ", ").replace("Z", ""),
          }));

          const { operations } = this.state;
          this.setState({
            operations: [...operations, ...additional],
            // eslint-disable-next-line no-underscore-dangle
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
  }

  render() {
    const columns = [
      { Header: "fact hash", accessor: "hash", width: "60%", align: "left" },
      { Header: "confirmed at", accessor: "confirmed", width: "25%", align: "left" },
      { Header: "block height", accessor: "height", width: "15%", align: "left" },
    ];

    const { next, operations } = this.state;
    const rows = operations.map((o) => ({
      hash: (
        <MDTypography
          variant="caption"
          color="link"
          fontWeight="regular"
          letterSpacing={1}
          component="a"
          href={`/operation/${o.hash}`}
          target="_self"
          rel="noreferrer"
        >
          {o.hash}
        </MDTypography>
      ),
      confirmed: (
        <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
          {o.confirmed}
        </MDTypography>
      ),
      height: (
        <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
          {o.height}
        </MDTypography>
      ),
    }));

    if (rows.length === 0) {
      rows.push({
        hash: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            -
          </MDTypography>
        ),
        confirmed: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            -
          </MDTypography>
        ),
        height: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            -
          </MDTypography>
        ),
      });
    }

    return (
      <MDBox p={3}>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            Operations
          </MDTypography>
        </MDBox>
        <DataTable table={{ columns, rows }} isSorted={false} noEndBorder />
        {next && operations.length >= 10 ? (
          <MDBox mt={1}>
            <MDButton
              variant="outlined"
              color="info"
              size="small"
              onClick={() => this.loadMore()}
              fullWidth
            >
              view more
            </MDButton>
          </MDBox>
        ) : (
          false
        )}
      </MDBox>
    );
  }
}

Operations.propTypes = {
  param: PropTypes.string.isRequired,
};

export default Operations;
