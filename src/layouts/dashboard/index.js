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
import React from "react";
import axios from "axios";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTextItem from "components/MDTextItem";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Dashboard components
import Nodes from "./components/Nodes";
import Tokens from "./components/Tokens";
import Blocks from "./components/Blocks";
import Operations from "./components/Operations";

const getNodes = () => axios.get(process.env.REACT_APP_BLOCKCHAIN_NETWORK);
const getBlocks = () =>
  axios.get(`${process.env.REACT_APP_BLOCKCHAIN_NETWORK}/block/manifests?reverse=1`);

const getOperations = () =>
  axios.get(`${process.env.REACT_APP_BLOCKCHAIN_NETWORK}/block/operations?reverse=1`);

const getTokens = () => axios.get(`${process.env.REACT_APP_BLOCKCHAIN_NETWORK}/currency`);
const getTokenInfo = (token) =>
  axios.get(`${process.env.REACT_APP_BLOCKCHAIN_NETWORK}/currency/${token}`);

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
          { Header: "confirmed", accessor: "confirmed", width: "25%", align: "left" },
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
          amount: "0",
        },
        t1: {
          currency: "",
          amount: "0",
        },
        t2: {
          currency: "",
          amount: "0",
        },
      },
    };

    this.ready = false;
    this.loadInfo(0);
  }

  componentDidMount() {
    this.ready = true;
  }

  componentWillUnmount() {
    this.ready = false;
  }

  loadInfo(count) {
    getNodes()
      .then((res) => {
        // eslint-disable-next-line no-underscore-dangle
        const nV = res.data._embedded.version;
        // eslint-disable-next-line no-underscore-dangle
        const nN = res.data._embedded.suffrage
          .map((n) => ({
            node: n.address,
            address: n.conninfo ? n.conninfo.url : "-",
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
        // eslint-disable-next-line no-underscore-dangle
        const _blocks = res.data._embedded
          // eslint-disable-next-line no-underscore-dangle
          .map((x) => x._embedded)
          .map((b) => ({
            height: <MDTextItem content={`${b.height}`} url={`/block/${b.height}`} link />,
            hash: <MDTextItem content={b.hash} url={`/block/${b.hash}`} link />,
            confirmed: <MDTextItem content={b.confirmed_at.replace("T", ", ").replace("Z", "")} />,
          }));

        const { blocks } = this.state;
        if (this.ready) {
          this.setState({
            // eslint-disable-next-line no-underscore-dangle
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
        // eslint-disable-next-line no-underscore-dangle
        const _operations = res.data._embedded
          // eslint-disable-next-line no-underscore-dangle
          .map((x) => x._embedded)
          .map((o) => ({
            height: <MDTextItem content={`${o.height}`} url={`/block/${o.height}`} link />,
            hash: (
              <MDTextItem
                content={o.operation.fact.hash}
                url={`/operation/${o.operation.fact.hash}`}
                link
              />
            ),
            confirmed: <MDTextItem content={o.confirmed_at.replace("T", ", ").replace("Z", "")} />,
          }));

        const { operations } = this.state;
        if (this.ready) {
          this.setState({
            // eslint-disable-next-line no-underscore-dangle
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

          // eslint-disable-next-line no-underscore-dangle
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
            .slice(0, 3)
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
              return {
                currency: t,
                amount: "0",
              };
            });

          if (this.ready) {
            this.setState({
              tokens: {
                t0: newTokens[0],
                t1: newTokens[1],
                t2: newTokens[2],
              },
            });

            this.loadTokenInfo(newTokens[0].currency);
            this.loadTokenInfo(newTokens[1].currency);
            this.loadTokenInfo(newTokens[2].currency);
          }
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.error(`Cannot load token information\n${e}`);
        });
    }

    setTimeout(() => this.loadInfo((count + 1) % 10), 1000);
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
        // eslint-disable-next-line no-underscore-dangle
        const info = res.data._embedded;
        const { amount } = info.amount;

        const newToken = {
          currency: cid,
          amount,
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
        }
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(`Cannot load currency information\n${e}`);
      });
  }

  render() {
    const { networkVersion, nodes, blocks, operations, tokens } = this.state;
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox py={3}>
          <Grid container spacing={3}>
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
                <Tokens tokens={[tokens.t0, tokens.t1, tokens.t2]} />
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
