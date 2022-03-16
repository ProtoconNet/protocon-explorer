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

// react components
import { useParams } from "react-router-dom";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// protocon explorer React layout components
import TokenInfo from "./components/TokenInfo";
import Tokens from "./components/Tokens";

function TokensDefault() {
  const params = useParams();
  const currency = Object.prototype.hasOwnProperty.call(params, "currency")
    ? params.currency
    : null;

  return (
    <DashboardLayout>
      <DashboardNavbar placeHolder="currency id" redirectables={["document id"]} />
      {currency ? <TokenInfo param={currency} /> : <Tokens />}
      <Footer />
    </DashboardLayout>
  );
}

export default TokensDefault;
