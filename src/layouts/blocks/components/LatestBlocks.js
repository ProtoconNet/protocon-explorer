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

import { Card, Grid } from "@mui/material";
import colors from "assets/theme-dark/base/colors";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import WideDataTable from "examples/Tables/WideDataTable";

import data from "../data";

function LatestBlocks() {
  const { columns, rows } = data();

  return (
    <MDBox pt={6} pb={3}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
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
                Lateset Blocks
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <WideDataTable
                table={{ columns, rows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item mt={2} xs={12}>
          <MDButton variant="outlined" color="info" size="small" fullWidth>
            view more
          </MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default LatestBlocks;
