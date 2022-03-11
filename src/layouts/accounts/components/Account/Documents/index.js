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
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "./data";

function Documents() {
  const { columns, rows } = data();

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
      <DataTable
        table={{ columns, rows }}
        showTotalEntries={false}
        isSorted={false}
        noEndBorder
        entriesPerPage={false}
      />
      <MDBox mt={1}>
        <MDButton variant="outlined" color="info" size="small" fullWidth>
          view more
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

export default Documents;
