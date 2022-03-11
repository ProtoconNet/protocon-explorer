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

import { useState } from "react";
import Raw from "layouts/raw";

import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import { Card } from "@mui/material";
import OperationOverview from "./OperationOverview";
import Items from "./Items";
import Keys from "./Keys";
import Amounts from "./Amounts";
import FactSigns from "./FactSigns";

function OperationInfo({ param }) {
  const [data, setData] = useState(null);

  const load = async () => {
    if (data) {
      setData(null);
    } else {
      setData({ _hint: "tmp", hash: "tmp" });
    }
  };

  console.log(param);

  return (
    <MDBox pt={6} pb={3}>
      {data ? (
        <Raw data={data} onClick={() => load()} />
      ) : (
        <Card id="delete-Operation">
          <MDBox pt={1} pb={2} px={2}>
            <OperationOverview
              noGutter={1}
              type="mitum-currency-create-accounts-operation"
              hash="HFtk9YuQXg1WgjS8MKFunZgREqFH4d18Baj3x2e45mSY"
              factHash="5hFZrz2U1HDgjUP6VDchYM3c7foi9jb7WEJyRUTGExbt"
              sender="BpZtT2n7i13naBpHCFpDS8j2AXAkDjvLRqT6r4u3xBMfmca"
              confirmed="2022/03/08, 07:31:12.107"
              height={12938}
              inState
              onClick={() => load()}
            />
          </MDBox>
          <MDBox py={1} px={2}>
            <Keys />
          </MDBox>
          <MDBox py={1} px={2}>
            <Amounts />
          </MDBox>
          <MDBox py={1} px={2}>
            <FactSigns />
          </MDBox>
          <MDBox py={1} px={2}>
            <Items type="mitum-create-documents-item" />
          </MDBox>
        </Card>
      )}
    </MDBox>
  );
}

OperationInfo.propTypes = {
  param: PropTypes.string.isRequired,
};

export default OperationInfo;
