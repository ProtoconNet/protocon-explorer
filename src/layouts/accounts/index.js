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
import { useParams } from "react-router-dom";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import Accounts from "./components/Accounts";
import Account from "./components/Account";

function AccountsDefault() {
  const params = useParams();
  const key = Object.prototype.hasOwnProperty.call(params, "key") ? params.key : null;
  const address = Object.prototype.hasOwnProperty.call(params, "address") ? params.address : null;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {!(key || address) && <Accounts param="cnMJqt1Q7LXKqFAWprm6FBC7fRbWQeZhrymTavN11PKJmca" />}
      {key && <Accounts param="cnMJqt1Q7LXKqFAWprm6FBC7fRbWQeZhrymTavN11PKJmpu" />}
      {address && <Account param="cnMJqt1Q7LXKqFAWprm6FBC7fRbWQeZhrymTavN11PKJmca" />}
      <Footer />
    </DashboardLayout>
  );
}

export default AccountsDefault;
