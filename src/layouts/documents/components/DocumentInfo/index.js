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
import DocumentOverview from "./DocumentOverview";
import UserData from "./details/UserData";

function DocumentInfo({ param }) {
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
            <DocumentOverview
              noGutter={1}
              type="mitum-blockcity-document-user-data"
              id="sdlkfjlkdfjcui"
              owner="EEDChJKA3tAEDbN22WR3ayGq3nnQ61FoPQzoQfEPCnAUmca"
              height={123}
              onClick={() => load()}
            />
          </MDBox>
          <UserData
            gold={1000}
            bankGold={100000}
            hp={10}
            str={10}
            dex={10}
            cha={10}
            intel={10}
            vital={10}
          />
        </Card>
      )}
    </MDBox>
  );
}

DocumentInfo.propTypes = {
  param: PropTypes.string.isRequired,
};

export default DocumentInfo;
