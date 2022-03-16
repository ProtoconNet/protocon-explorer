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
import Accounts from "./components/Accounts";
import Account from "./components/Account";

function AccountsDefault() {
  const params = useParams();
  const key = Object.prototype.hasOwnProperty.call(params, "key") ? params.key : null;
  const address = Object.prototype.hasOwnProperty.call(params, "address") ? params.address : null;

  return (
    <DashboardLayout>
      <DashboardNavbar
        placeHolder="account address / public key"
        redirectables={["account address", "public key"]}
      />
      {!(key || address) && <Accounts param={null} />}
      {key && <Accounts param={key} />}
      {address && <Account param={address} />}
      <Footer />
    </DashboardLayout>
  );
}

export default AccountsDefault;
