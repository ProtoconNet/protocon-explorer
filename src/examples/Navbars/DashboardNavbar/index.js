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

import { useState, useEffect } from "react";

// react-router components
import { useNavigate, useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";

// Custom styles for DashboardNavbar
import { navbar, navbarContainer, navbarRow } from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import { useMaterialUIController, setTransparentNavbar } from "context";

function DashboardNavbar({ absolute, light, isMini, placeHolder, redirectables }) {
  const [navbarType, setNavbarType] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [controller, dispatch] = useMaterialUIController();
  const { transparentNavbar, fixedNavbar, darkMode } = controller;
  const route = useLocation().pathname.split("/").slice(1);

  const [infoSB, setInfoSB] = useState(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      title="Wrong Input"
      content={`You can't search for '${searchInput}'.`}
      dateTime="now"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const navigate = useNavigate();
  const handleKeyPress = (e) => {
    const isAddress = (target) => {
      const reg = /[a-zA-Z0-9]+mca$/;
      return reg.test(target);
    };

    const isPublicKey = (target) => {
      const reg = /[a-zA-Z0-9]+mpu$/;
      return reg.test(target);
    };

    const isNumber = (target) => {
      if (target === "0") {
        return true;
      }
      const reg = /^[1-9][0-9]*$/;
      return reg.test(target);
    };

    const isDocumentId = (target) => {
      if (target.includes(" ")) {
        return false;
      }

      const res1 = /.*sdi$/.test(target);
      const res2 = /.*cui$/.test(target);
      const res3 = /.*cli$/.test(target);
      const res4 = /.*cvi$/.test(target);
      const res5 = /.*chi$/.test(target);

      return res1 || res2 || res3 || res4 || res5;
    };

    if (e.key === "Enter" && searchInput) {
      if (isAddress(searchInput) && redirectables.includes("account address")) {
        navigate(`/account/${searchInput}`);
        return;
      }
      if (isPublicKey(searchInput) && redirectables.includes("public key")) {
        navigate(`/accounts/${searchInput}`);
        return;
      }
      if (isNumber(searchInput) && redirectables.includes("block height")) {
        navigate(`/block/${searchInput}`);
        return;
      }
      if (isDocumentId(searchInput) && redirectables.includes("document id")) {
        navigate(`/document/${searchInput}`);
        return;
      }

      if (redirectables.includes("block hash") && !/^0[0-9]*$/.test(searchInput)) {
        navigate(`/block/${searchInput}`);
        return;
      }

      if (redirectables.includes("fact hash")) {
        navigate(`/operation/${searchInput}`);
        return;
      }

      if (redirectables.includes("currency id")) {
        navigate(`/token/${searchInput}`);
        return;
      }

      openInfoSB();
    }
  };

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox pr={1}>
              <MDInput
                label={placeHolder}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e)}
              />
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
      {renderInfoSB}
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
  placeHolder: "Search here...",
  redirectables: [],
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
  placeHolder: PropTypes.string,
  redirectables: PropTypes.arrayOf(
    PropTypes.oneOf([
      "block hash",
      "block height",
      "fact hash",
      "account address",
      "public key",
      "currency id",
      "document id",
    ])
  ),
};

export default DashboardNavbar;
