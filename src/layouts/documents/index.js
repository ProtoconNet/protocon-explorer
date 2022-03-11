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

// data
import LatestDocuments from "./components/LatestDocuments";
import DocumentInfo from "./components/DocumentInfo";

function Documents() {
  const params = useParams();
  const id = Object.prototype.hasOwnProperty.call(params, "id") ? params.id : null;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {id ? <DocumentInfo param={id} /> : <LatestDocuments />}
      <Footer />
    </DashboardLayout>
  );
}

export default Documents;
