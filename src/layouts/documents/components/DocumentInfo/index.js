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
import DocumentOverview from "./DocumentOverview";
import UserData from "./details/UserData";
import LandData from "./details/LandData";
import VoteData from "./details/VoteData";
import HistoryData from "./details/HistoryData";
import BlockSignData from "./details/BlockSignData";

const getDocumentInfo = (did) =>
  axios.get(
    `${
      sessionStorage.getItem(process.env.REACT_APP_SESSION_KEY_NETWORK) ||
      process.env.REACT_APP_BLOCKCHAIN_NETWORK
    }/block/document/${did}`
  );

class DocumentInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isShow: false,

      type: "-",
      id: "-",
      owner: "-",
      height: -1,

      content: null,
    };

    this.loadDocumentInfo();
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

  loadDocumentInfo() {
    const { param } = this.props;
    getDocumentInfo(param)
      .then((res) => {
        // eslint-disable-next-line no-underscore-dangle
        const { document } = res.data._embedded;
        const type = document.info.doctype;
        const { id } = document.info.docid;
        const { owner } = document;
        // eslint-disable-next-line no-underscore-dangle
        const { height } = res.data._embedded;

        let content = null;
        if (type.indexOf("user-data") >= 0) {
          const { statistics } = document;
          content = {
            gold: document.gold,
            bankGold: document.bankgold,
            hp: statistics.hp,
            str: statistics.strength,
            dex: statistics.dexterity,
            cha: statistics.charisma,
            intel: statistics.intelligence,
            vital: statistics.vital,
          };
        }
        if (type.indexOf("land-data") >= 0) {
          content = {
            address: document.address,
            area: document.area,
            renter: document.renter,
            account: document.account,
            rent: document.rentdate,
            period: document.periodday,
          };
        }
        if (type.indexOf("voting-data") >= 0) {
          content = {
            round: document.round,
            end: document.endvotetime,
            boss: document.bossname,
            account: document.account,
            termofoffice: document.termofoffice,
            candidates: document.candidates,
          };
        }
        if (type.indexOf("history-data") >= 0) {
          content = {
            name: document.name,
            account: document.account,
            date: document.date,
            usage: document.usage,
            app: document.application,
          };
        }
        if (type.indexOf("blocksign") >= 0) {
          content = {
            filehash: document.filehash,
            creator: document.creator,
            title: document.title,
            size: document.size,
            signers: document.signers,
          };
        }

        this.setState({
          data: res.data,
          type,
          id,
          owner,
          height,
          content,
        });
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(`Cannot load document information\n${e}`);
      });
  }

  render() {
    const { data, isShow, type, id, owner, height, content } = this.state;

    const renderDetails = () => {
      if (type.indexOf("user-data") >= 0) {
        return (
          <UserData
            gold={content.gold}
            bankGold={content.bankGold}
            hp={content.hp}
            str={content.str}
            dex={content.dex}
            cha={content.cha}
            intel={content.intel}
            vital={content.vital}
          />
        );
      }
      if (type.indexOf("land-data") >= 0) {
        return (
          <LandData
            account={content.account}
            address={content.address}
            area={content.area}
            period={content.period}
            rent={content.rent}
            renter={content.renter}
          />
        );
      }
      if (type.indexOf("voting-data") >= 0) {
        return (
          <VoteData
            account=""
            boss=""
            candidates={content.candidates}
            end={content.end}
            round={content.round}
            termofoffice={content.termofoffice}
          />
        );
      }
      if (type.indexOf("history-data") >= 0) {
        return (
          <HistoryData
            account={content.account}
            app={content.app}
            date={content.date}
            name={content.name}
            usage={content.usage}
          />
        );
      }
      if (type.indexOf("blocksign") >= 0) {
        return (
          <BlockSignData
            filehash={content.filehash}
            creator={content.creator}
            signers={content.signers}
            size={content.size}
            title={content.title}
          />
        );
      }

      return false;
    };

    return isShow ? (
      <Raw data={data} onClick={() => this.handleShow()} />
    ) : (
      <MDBox py={5} px={1} mx={0.5}>
        <Card id="delete-account">
          <MDBox pt={1} pb={2} px={2}>
            <DocumentOverview
              type={type}
              id={id}
              owner={owner}
              height={height}
              onClick={() => this.handleShow()}
            />
          </MDBox>
          {renderDetails()}
        </Card>
      </MDBox>
    );
  }
}

DocumentInfo.propTypes = {
  param: PropTypes.string.isRequired,
};

export default DocumentInfo;
