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
import TokenOverview from "./TokenOverview";

function TokenInfo({ param }) {
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
    <MDBox pt={6} pb={6}>
      {data ? (
        <Raw data={data} onClick={() => load()} />
      ) : (
        <Card id="delete-account">
          <MDBox p={2}>
            <TokenOverview
              noGutter={1}
              currency="PEN"
              amount="1000000000000000000"
              minBalance="10000"
              type="fixed"
              receiver="EEDChJKA3tAEDbN22WR3ayGq3nnQ61FoPQzoQfEPCnAU"
              fee="1000.000"
              onClick={() => load()}
            />
          </MDBox>
        </Card>
      )}
    </MDBox>
  );
}

TokenInfo.propTypes = {
  param: PropTypes.string.isRequired,
};

export default TokenInfo;
