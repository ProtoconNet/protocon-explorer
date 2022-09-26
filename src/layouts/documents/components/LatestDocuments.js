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

// Material Dashboard 2 React base styles
import colors from "assets/theme-dark/base/colors";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import WideDataTable from "examples/Tables/WideDataTable";

// Protocon Explorer React components
import PETextItem from "components/PETextItem";

const getDocuments = () =>
  axios.get(
    `${
      sessionStorage.getItem(process.env.REACT_APP_SESSION_KEY_NETWORK) ||
      process.env.REACT_APP_BLOCKCHAIN_NETWORK
    }/block/documents?reverse=1`
  );
const getMore = (next) =>
  axios.get(
    `${
      sessionStorage.getItem(process.env.REACT_APP_SESSION_KEY_NETWORK) ||
      process.env.REACT_APP_BLOCKCHAIN_NETWORK
    }${next}`
  );

class LatestDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      next: "",
    };

    this.loadDocuments();
  }

  loadDocuments() {
    getDocuments()
      .then((res) => {
        const documents = res.data._embedded.map((doc) => {
          const { height, document } = doc._embedded;
          const { doctype } = document.info;
          let type = "UNKNOWN";

          if (doctype.indexOf("user-data") >= 0) {
            type = "BC-USER";
          }
          if (doctype.indexOf("land-data") >= 0) {
            type = "BC-LAND";
          }
          if (doctype.indexOf("voting-data") >= 0) {
            type = "BC-VOTE";
          }
          if (doctype.indexOf("history-data") >= 0) {
            type = "BC-HISTORY";
          }
          if (doctype.indexOf("blocksign") >= 0) {
            type = "BS";
          }

          return {
            height,
            type,
            id: document.info.docid.id,
            owner: document.owner,
          };
        });

        this.setState({
          documents,
          next: res.data._links.next.href,
        });
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(`Cannot load documents\n${e}`);
      });
  }

  loadMore() {
    const { next } = this.state;
    getMore(next)
      .then((res) => {
        const additional = res.data._embedded.map((doc) => {
          const { height, document } = doc._embedded;
          const { doctype } = document.info;
          let type;

          if (doctype.indexOf("user-data") >= 0) {
            type = "BC-USER";
          }
          if (doctype.indexOf("land-data") >= 0) {
            type = "BC-LAND";
          }
          if (doctype.indexOf("voting-data") >= 0) {
            type = "BC-VOTE";
          }
          if (doctype.indexOf("history-data") >= 0) {
            type = "BC-HISTORY";
          }
          if (doctype.indexOf("blocksign") >= 0) {
            type = "BS";
          }

          return {
            height,
            type,
            id: document.info.docid.id,
            owner: document.owner,
          };
        });

        const { documents } = this.state;
        this.setState({
          documents: [...documents, ...additional],
          next: res.data._links.next.href,
        });
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(`No more documents\n${e}`);
        this.setState({
          next: "",
        });
      });
  }

  render() {
    const columns = [
      { Header: "document type", accessor: "type", width: "15%", align: "left" },
      { Header: "document id", accessor: "id", width: "25%", align: "left" },
      { Header: "owner", accessor: "owner", width: "45%", align: "left" },
      { Header: "block height", accessor: "height", width: "15%", align: "left" },
    ];

    const { next, documents } = this.state;
    const rows = documents.map((doc) => ({
      type: <PETextItem content={doc.type} />,
      id: <PETextItem content={doc.id} href={`/document/${doc.id}`} />,
      owner: <PETextItem content={doc.owner} href={`/account/${doc.owner}`} />,
      height: <PETextItem content={doc.height} href={`/block/${doc.height}`} />,
    }));

    if (rows.length === 0) {
      rows.push({
        type: <PETextItem content="-" />,
        id: <PETextItem content="-" />,
        owner: <PETextItem content="-" />,
        height: <PETextItem content="-" />,
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
                    Latest Documents
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <WideDataTable table={{ columns, rows }} isSorted={false} noEndBorder />
                </MDBox>
              </Card>
            </MDBox>
          </Grid>
        </Grid>
        {next && documents.length >= 10 && (
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

export default LatestDocuments;
