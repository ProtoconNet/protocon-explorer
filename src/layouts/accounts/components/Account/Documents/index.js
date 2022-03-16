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

const getDocuments = (address) =>
  axios.get(
    `${
      sessionStorage.getItem("network") || process.env.REACT_APP_BLOCKCHAIN_NETWORK
    }/account/${address}/documents`
  );
const getMore = (next) =>
  axios.get(
    `${sessionStorage.getItem("network") || process.env.REACT_APP_BLOCKCHAIN_NETWORK}${next}`
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
        // eslint-disable-next-line no-underscore-dangle
        const documents = res.data._embedded.map((d) => {
          // eslint-disable-next-line no-underscore-dangle
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
          // eslint-disable-next-line no-underscore-dangle
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
        // eslint-disable-next-line no-underscore-dangle
        const additional = res.data._embedded.map((d) => {
          // eslint-disable-next-line no-underscore-dangle
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
          // eslint-disable-next-line no-underscore-dangle
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
      type: (
        <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
          {doc.type}
        </MDTypography>
      ),
      id: (
        <MDTypography
          variant="caption"
          color="link"
          fontWeight="regular"
          letterSpacing={1}
          component="a"
          href={`/document/${doc.id}`}
          target="_self"
          rel="noreferrer"
        >
          {doc.id}
        </MDTypography>
      ),
      owner: (
        <MDTypography
          variant="caption"
          color="link"
          fontWeight="regular"
          letterSpacing={1}
          component="a"
          href={`/account/${doc.owner}`}
          target="_self"
          rel="noreferrer"
        >
          {doc.owner}
        </MDTypography>
      ),
      height: (
        <MDTypography
          variant="caption"
          color="link"
          fontWeight="regular"
          letterSpacing={1}
          component="a"
          href={`/block/${doc.height}`}
          target="_self"
          rel="noreferrer"
        >
          {doc.height}
        </MDTypography>
      ),
    }));

    if (rows.length === 0) {
      rows.push({
        type: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            -
          </MDTypography>
        ),
        id: (
          <MDTypography variant="caption" color="text" fontWeight="regular" letterSpacing={1}>
            -
          </MDTypography>
        ),
        owner: (
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
