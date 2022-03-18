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
import React from "react";

// axios
import axios from "axios";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Protocon Explorer React components
import PETextItem from "components/PETextItem";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Protocon Explorer React layout components
import Nodes from "./components/Nodes";
import Tokens from "./components/Tokens";
import Blocks from "./components/Blocks";
import Operations from "./components/Operations";

const getNodes = () =>
  axios.get(
    sessionStorage.getItem(process.env.REACT_APP_SESSION_KEY_NETWORK) ||
      process.env.REACT_APP_BLOCKCHAIN_NETWORK
  );
const getBlocks = () =>
  axios.get(
    `${
      sessionStorage.getItem(process.env.REACT_APP_SESSION_KEY_NETWORK) ||
      process.env.REACT_APP_BLOCKCHAIN_NETWORK
    }/block/manifests?reverse=1`
  );

const getOperations = () =>
  axios.get(
    `${
      sessionStorage.getItem(process.env.REACT_APP_SESSION_KEY_NETWORK) ||
      process.env.REACT_APP_BLOCKCHAIN_NETWORK
    }/block/operations?reverse=1`
  );

const getTokens = () =>
  axios.get(
    `${
      sessionStorage.getItem(process.env.REACT_APP_SESSION_KEY_NETWORK) ||
      process.env.REACT_APP_BLOCKCHAIN_NETWORK
    }/currency`
  );
const getTokenInfo = (token) =>
  axios.get(
    `${
      sessionStorage.getItem(process.env.REACT_APP_SESSION_KEY_NETWORK) ||
      process.env.REACT_APP_BLOCKCHAIN_NETWORK
    }/currency/${token}`
  );

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      networkVersion: "",
      nodes: [],

      blocks: {
        columns: [
          { Header: "block height", accessor: "height", width: "15%", align: "left" },
          { Header: "block hash", accessor: "hash", width: "60%", align: "left" },
          { Header: "confirmed at", accessor: "confirmed", width: "25%", align: "left" },
        ],
        rows: [],
        height: -1,
      },

      operations: {
        columns: [
          { Header: "fact hash", accessor: "hash", width: "60%", align: "left" },
          { Header: "confirmed at", accessor: "confirmed", width: "25%", align: "left" },
          { Header: "block height", accessor: "height", width: "15%", align: "left" },
        ],
        rows: [],
      },

      tokens: {
        t0: {
          currency: "",
        },
        t1: {
          currency: "",
        },
        t2: {
          currency: "",
        },
        t3: {
          currency: "",
        },
      },
    };

    this.ready = false;
    this.loadInfo(0, true);
    setTimeout(() => this.loadInfo(0, false), 1000);
  }

  componentDidMount() {
    this.ready = true;
  }

  componentWillUnmount() {
    this.ready = false;
  }

  loadInfo(count, firstLoad) {
    if (
      !JSON.parse(sessionStorage.getItem(process.env.REACT_APP_SESSION_KEY_AUTO_LOAD)) &&
      !firstLoad
    ) {
      setTimeout(() => this.loadInfo((count + 1) % 3, false), 1000);
      return;
    }

    getNodes()
      .then((res) => {
        const nV = res.data._embedded.version;
        const nN = res.data._embedded.suffrage
          .map((n) => ({
            node: n.address,
            address: n.conninfo ? n.conninfo.url : "",
            alive: n.conninfo && true,
          }))
          .sort((x, y) => x.attr.localeCompare(y.attr));

        if (this.ready) {
          if (nN.length > 4) {
            this.setState({
              networkVersion: nV,
              nodes: [{ ...nN[0] }, { ...nN[1] }, { ...nN[2] }, { ...nN[3] }],
            });
          } else {
            this.setState({
              networkVersion: nV,
              nodes: nN,
            });
          }
        }
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(`Cannot load network information\n${e}`);
      });

    getBlocks()
      .then((res) => {
        const _blocks = res.data._embedded
          .map((x) => x._embedded)
          .map((b) => ({
            height: <PETextItem content={`${b.height}`} href={`/block/${b.height}`} link />,
            hash: <PETextItem content={b.hash} href={`/block/${b.hash}`} link />,
            confirmed: <PETextItem content={b.confirmed_at.replace("T", ", ").replace("Z", "")} />,
          }));

        if (_blocks.length < 10) {
          const len = _blocks.length;
          for (let i = 0; i < 10 - len; i += 1) {
            _blocks.push({
              height: <PETextItem content="-" />,
              hash: <PETextItem content="-" />,
              confirmed: <PETextItem content="-" />,
            });
          }
        }

        const { blocks } = this.state;
        if (this.ready) {
          this.setState({
            blocks: { ...blocks, rows: _blocks, height: res.data._embedded[0]._embedded.height },
          });
        }
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(`Cannot load block information\n${e}`);
      });

    getOperations()
      .then((res) => {
        const _operations = res.data._embedded
          .map((x) => x._embedded)
          .map((o) => ({
            height: <PETextItem content={`${o.height}`} href={`/block/${o.height}`} link />,
            hash: (
              <PETextItem
                content={o.operation.fact.hash}
                href={`/operation/${o.operation.fact.hash}`}
                link
              />
            ),
            confirmed: <PETextItem content={o.confirmed_at.replace("T", ", ").replace("Z", "")} />,
          }));

        if (_operations.length < 10) {
          const len = _operations.length;
          for (let i = 0; i < 10 - len; i += 1) {
            _operations.push({
              height: <PETextItem content="-" />,
              hash: <PETextItem content="-" />,
              confirmed: <PETextItem content="-" />,
            });
          }
        }

        const { operations } = this.state;
        if (this.ready) {
          this.setState({
            operations: { ...operations, rows: _operations },
          });
        }
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(`Cannot load operation information\n${e}`);
      });

    if (count === 0) {
      getTokens()
        .then((res) => {
          const { tokens } = this.state;

          const newTokens = Object.keys(res.data._links)
            .map((t) => {
              const splitted = t.split(":");
              if (splitted.length === 2 && splitted[1] !== "{currencyid}") {
                return splitted[1];
              }
              return null;
            })
            .filter((t) => t)
            .sort((x, y) => {
              if (x > y) {
                return 1;
              }
              if (x < y) {
                return -1;
              }
              return 0;
            })
            .slice(0, 4)
            .map((t) => {
              if (tokens.t0.currency === t) {
                return tokens.t0;
              }
              if (tokens.t1.currency === t) {
                return tokens.t1;
              }
              if (tokens.t2.currency === t) {
                return tokens.t2;
              }
              if (tokens.t3.currency === t) {
                return tokens.t3;
              }
              return {
                currency: t,
              };
            });

          if (this.ready) {
            if (newTokens.length >= 4) {
              this.setState({
                tokens: {
                  t0: newTokens[0],
                  t1: newTokens[1],
                  t2: newTokens[2],
                  t3: newTokens[3],
                },
              });

              this.loadTokenInfo(newTokens[0].currency);
              this.loadTokenInfo(newTokens[1].currency);
              this.loadTokenInfo(newTokens[2].currency);
              this.loadTokenInfo(newTokens[3].currency);
            } else if (newTokens.length === 3) {
              this.setState({
                tokens: {
                  t0: newTokens[0],
                  t1: newTokens[1],
                  t2: newTokens[2],
                  t3: {
                    currency: "",
                  },
                },
              });

              this.loadTokenInfo(newTokens[0].currency);
              this.loadTokenInfo(newTokens[1].currency);
              this.loadTokenInfo(newTokens[2].currency);
            } else if (newTokens.length === 2) {
              this.setState({
                tokens: {
                  t0: newTokens[0],
                  t1: newTokens[1],
                  t2: {
                    currency: "",
                  },
                  t3: {
                    currency: "",
                  },
                },
              });

              this.loadTokenInfo(newTokens[0].currency);
              this.loadTokenInfo(newTokens[1].currency);
            } else if (newTokens.length === 1) {
              this.setState({
                tokens: {
                  t0: newTokens[0],
                  t1: {
                    currency: "",
                  },
                  t2: {
                    currency: "",
                  },
                  t3: {
                    currency: "",
                  },
                },
              });

              this.loadTokenInfo(newTokens[0].currency);
            } else {
              this.setState({
                tokens: {
                  t0: {
                    currency: "",
                  },
                  t1: {
                    currency: "",
                  },
                  t2: {
                    currency: "",
                  },
                  t3: {
                    currency: "",
                  },
                },
              });
            }
          }
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.error(`Cannot load token information\n${e}`);
        });
    }

    setTimeout(() => this.loadInfo((count + 1) % 3, false), firstLoad ? 0 : 1000);
  }

  loadTokenInfo(cid) {
    const isDifferent = (t1, t2) => {
      if (t1.amount !== t2.amount) {
        return true;
      }

      const t1HasFee = Object.prototype.hasOwnProperty.call(t1, "fee");
      const t2HasFee = Object.prototype.hasOwnProperty.call(t2, "fee");
      if (!((t1HasFee && t2HasFee) || !(t1HasFee || t2HasFee))) {
        return true;
      }

      if (t1HasFee && t2HasFee && t1.fee !== t2.fee) {
        return true;
      }

      return false;
    };

    getTokenInfo(cid)
      .then((res) => {
        const info = res.data._embedded;

        const newToken = {
          currency: cid,
        };

        if (Object.prototype.hasOwnProperty.call(info.policy.feeer, "amount")) {
          newToken.fee = `${info.policy.feeer.amount}`;
        }
        if (Object.prototype.hasOwnProperty.call(info.policy.feeer, "ratio")) {
          newToken.fee = `${info.policy.feeer.ratio}`;
        }

        // eslint-disable-next-line react/destructuring-assignment
        const { tokens } = this.state;
        if (this.ready) {
          if (tokens.t0.currency === cid && isDifferent(tokens.t0, newToken)) {
            this.setState({
              tokens: {
                ...tokens,
                t0: newToken,
              },
            });
          }
          if (tokens.t1.currency === cid && isDifferent(tokens.t1, newToken)) {
            this.setState({
              tokens: {
                ...tokens,
                t1: newToken,
              },
            });
          }
          if (tokens.t2.currency === cid && isDifferent(tokens.t2, newToken)) {
            this.setState({
              tokens: {
                ...tokens,
                t2: newToken,
              },
            });
          }
          if (tokens.t3.currency === cid && isDifferent(tokens.t3, newToken)) {
            this.setState({
              tokens: {
                ...tokens,
                t3: newToken,
              },
            });
          }
        }
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(`Cannot load currency information\n${e}`);
      });
  }

  render() {
    const { networkVersion, nodes, blocks, operations, tokens } = this.state;

    const tokensToRender = [];
    if (tokens.t0.currency) {
      tokensToRender.push(tokens.t0);
    }
    if (tokens.t1.currency) {
      tokensToRender.push(tokens.t1);
    }
    if (tokens.t2.currency) {
      tokensToRender.push(tokens.t2);
    }
    if (tokens.t3.currency) {
      tokensToRender.push(tokens.t3);
    }

    return (
      <DashboardLayout>
        <DashboardNavbar
          placeHolder="block height / fact hash / account address / public key"
          redirectables={["block height", "fact hash", "account address", "public key"]}
        />
        <MDBox py={3}>
          <Grid
            container
            spacing={{
              xs: 0,
              lg: 3,
            }}
          >
            <Grid item xs={12} md={12} lg={3}>
              <MDBox mb={3}>
                <ComplexStatisticsCard
                  key={`${blocks.rows} height`}
                  color="error"
                  icon="widgets"
                  title="Blocks"
                  count={blocks.height}
                />
              </MDBox>
              <MDBox mb={3}>
                <Nodes key={`${nodes}`} network={networkVersion} nodes={nodes} />
              </MDBox>
              <MDBox mb={3}>
                <Tokens tokens={tokensToRender} />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={12} lg={9}>
              <MDBox mb={3}>
                <Blocks key={`${blocks.rows}`} data={blocks} />
              </MDBox>
              <MDBox mb={3}>
                <Operations key={`${operations.rows}`} data={operations} />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }
}

export default Dashboard;
