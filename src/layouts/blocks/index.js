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
// react-router-dom components
import { useParams } from "react-router-dom";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Protocon Explorer React layout components
import LatestBlocks from "./components/LatestBlocks";
import BlockInfo from "./components/BlockInfo";

function Blocks() {
  const params = useParams();
  const key = Object.prototype.hasOwnProperty.call(params, "key") ? params.key : null;

  return (
    <DashboardLayout>
      <DashboardNavbar
        placeHolder="block height / block hash"
        redirectables={["block hash", "block height"]}
      />
      {key ? <BlockInfo param={key} /> : <LatestBlocks />}
      <Footer />
    </DashboardLayout>
  );
}

export default Blocks;
