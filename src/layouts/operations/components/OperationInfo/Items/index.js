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

// Data
import data from "./data";

function Items({ type, content }) {
  const { columns, rows } = data(type, content);

  let title = "Items";

  switch (type) {
    case process.env.REACT_APP_ITEM_CREATE_ACCOUNT:
    case process.env.REACT_APP_ITEM_CREATE_ACCOUNTS:
      title = "Created Accounts";
      break;
    case process.env.REACT_APP_ITEM_TRANSFER:
    case process.env.REACT_APP_ITEM_TRANSFERS:
      title = "Transfered Tokens";
      break;
    case process.env.REACT_APP_ITEM_CREATE_DOCUMENTS:
      title = "Created Documents";
      break;
    case process.env.REACT_APP_ITEM_UPDATE_DOCUMENTS:
      title = "Updated Documents";
      break;
    case process.env.REACT_APP_ITEM_SIGN_DOCUMENTS:
      title = "Signed Documents";
      break;
    default:
      title = "Unknown Items";
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
          {title}
        </MDTypography>
      </MDBox>
      <DataTable table={{ columns, rows }} isSorted={false} noEndBorder />
    </MDBox>
  );
}

Items.propTypes = {
  type: PropTypes.string.isRequired,
  content: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Items;
