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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DataTable from "examples/Tables/DataTable";

// Protocon Explorer React components
import PETextItem from "components/PETextItem";

// Protocon Explorer utils
import { parseAmount, parseFee } from "layouts/parse";

function Currencies({ currencies }) {
  const columns = [
    { Header: "currency", accessor: "currency", width: "15%", align: "left" },
    { Header: "amount", accessor: "amount", width: "20%", align: "right" },
    { Header: "fee", accessor: "fee", width: "15%", align: "right" },
    { Header: "receiver", accessor: "receiver", width: "50%", align: "left" },
  ];

  const rows = currencies.map((t) => ({
    currency: <PETextItem content={t.currency} href={`/token/${t.currency}`} />,
    amount: <PETextItem content={parseAmount(t.amount, t.currency)} />,
    fee: <PETextItem content={t.fee ? `${parseFee(t.fee, t.currency)}` : "-"} />,
    receiver: (
      <PETextItem content={t.receiver || "-"} href={t.receiver ? `/account/${t.receiver}` : ""} />
    ),
  }));

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
          Currencies
        </MDTypography>
      </MDBox>
      <DataTable table={{ columns, rows }} isSorted={false} noEndBorder />
    </MDBox>
  );
}

Currencies.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Currencies;
