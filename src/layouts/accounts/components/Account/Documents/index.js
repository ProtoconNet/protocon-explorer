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
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DataTable from "examples/Tables/DataTable";

// Protocon Explorer React components
import PETextItem from "components/PETextItem";

const getDocuments = (address) =>
  axios.get(
    `${
      sessionStorage.getItem(process.env.REACT_APP_SESSION_KEY_NETWORK) ||
      process.env.REACT_APP_BLOCKCHAIN_NETWORK
    }/account/${address}/documents?reverse=1`
  );
const getMore = (next) =>
  axios.get(
    `${
      sessionStorage.getItem(process.env.REACT_APP_SESSION_KEY_NETWORK) ||
      process.env.REACT_APP_BLOCKCHAIN_NETWORK
    }${next}`
  );

class Documents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documents: [],
      next: "",
    };

    this.loadDocuments();
  }

  loadDocuments() {
    const { address } = this.props;
    getDocuments(address)
      .then((res) => {
        const documents = res.data._embedded.map((d) => {
          const doc = d._embedded;
          const { doctype } = doc.document.info;
          const { id } = doc.document.info.docid;
          const { owner } = doc.document;
          const { height } = doc;

          let type;
          switch (doctype) {
            case process.env.REACT_APP_DOC_BLOCKSIGN:
              type = "BS";
              break;
            case process.env.REACT_APP_DOC_BLOCKCITY_USER:
              type = "BC-USER";
              break;
            case process.env.REACT_APP_DOC_BLOCKCITY_LAND:
              type = "BC-LAND";
              break;
            case process.env.REACT_APP_DOC_BLOCKCITY_VOTE:
              type = "BC-VOTE";
              break;
            case process.env.REACT_APP_DOC_BLOCKCITY_HISTORY:
              type = "BC-HISTORY";
              break;
            default:
              type = "UNKNOWN";
          }

          return {
            id,
            owner,
            height,
            type,
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
        const additional = res.data._embedded.map((d) => {
          const doc = d._embedded;
          const { doctype } = doc.document.info;
          const { id } = doc.document.info.docid;
          const { owner } = doc.document;
          const { height } = doc;

          let type;
          switch (doctype) {
            case process.env.REACT_APP_DOC_BLOCKSIGN:
              type = "BS";
              break;
            case process.env.REACT_APP_DOC_BLOCKCITY_USER:
              type = "BC-USER";
              break;
            case process.env.REACT_APP_DOC_BLOCKCITY_LAND:
              type = "BC-LAND";
              break;
            case process.env.REACT_APP_DOC_BLOCKCITY_VOTE:
              type = "BC-VOTE";
              break;
            case process.env.REACT_APP_DOC_BLOCKCITY_HISTORY:
              type = "BC-HISTORY";
              break;
            default:
              type = "UNKNOWN";
          }

          return {
            id,
            owner,
            height,
            type,
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
      <MDBox p={3}>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            Documents
          </MDTypography>
        </MDBox>
        <DataTable table={{ columns, rows }} isSorted={false} noEndBorder />
        {next && documents.length >= 10 ? (
          <MDBox mt={1}>
            <MDButton
              variant="outlined"
              color="info"
              size="small"
              onClick={() => this.loadMore(next)}
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

Documents.propTypes = {
  address: PropTypes.string.isRequired,
};

export default Documents;
