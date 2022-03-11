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

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Nodes from "./components/Nodes";
import Tokens from "./components/Tokens";
import Blocks from "./components/Blocks";
import Operations from "./components/Operations";

function Dashboard() {
  // const { sales } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={3}>
            <MDBox mb={3}>
              <ComplexStatisticsCard color="error" icon="widgets" title="Blocks" count={281} />
            </MDBox>
            <MDBox mb={3}>
              <Nodes
                network="network-01"
                nodes={[
                  { node: "node01", address: "https://127.0.0.1:12345", isLive: true },
                  { node: "node02", address: "https://127.0.0.1:12345", isLive: true },
                  { node: "node03", address: "https://127.0.0.1:12345", isLive: true },
                  { node: "node04", address: "https://127.0.0.1:12345", isLive: false },
                ]}
              />
            </MDBox>
            <MDBox mb={3}>
              <Tokens
                tokens={[
                  { currency: "PEN", amount: "100000000000000000000000", fee: { feeer: "nil" } },
                  {
                    currency: "MCC",
                    amount: "9800000000000000000000",
                    fee: { feeer: "fixed", amount: 1.2 },
                  },
                  {
                    currency: "CWC",
                    amount: "18882999999900000000",
                    fee: { feeer: "ratio", ratio: 0.1 },
                  },
                ]}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={12} lg={9}>
            <MDBox mb={3}>
              <Blocks />
            </MDBox>
            <MDBox mb={3}>
              <Operations />
            </MDBox>
          </Grid>
        </Grid>
        {/* <MDBox py={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
