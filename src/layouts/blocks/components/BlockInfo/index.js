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
import BlockOverview from "./BlockOverview";
import Operations from "./Operations";

function BlockInfo({ param }) {
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
        <Card id="delete-account">
          <MDBox pt={1} pb={2} px={2}>
            <BlockOverview
              noGutter={1}
              hash="EEDChJKA3tAEDbN22WR3ayGq3nnQ61FoPQzoQfEPCnAU"
              height={123}
              created="2022/03/07, 08:40:47.576"
              confirmed="2022/03/07, 08:40:47.554"
              onClick={() => load()}
            />
          </MDBox>
          <MDBox pt={1} pb={2} px={2}>
            <Operations />
          </MDBox>
        </Card>
      )}
    </MDBox>
  );
}

BlockInfo.propTypes = {
  param: PropTypes.string.isRequired,
};

export default BlockInfo;
