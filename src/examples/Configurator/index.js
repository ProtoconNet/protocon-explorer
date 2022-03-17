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

// @mui material components
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Custom styles for the Configurator
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";

// Material Dashboard 2 React context
import { useMaterialUIController, setOpenConfigurator } from "context";
import MDButton from "components/MDButton";

import { useState } from "react";
import MDInput from "components/MDInput";
import MDSnackbar from "components/MDSnackbar";

function Configurator() {
  const [controller, dispatch] = useMaterialUIController();
  const { openConfigurator, darkMode } = controller;

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);

  const [newNetwork, setNewNetwork] = useState(
    sessionStorage.getItem("network") || process.env.REACT_APP_BLOCKCHAIN_NETWORK
  );
  const [infoSB, setInfoSB] = useState(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      title="Network Change Completed"
      content={`Current Network: ${newNetwork}`}
      dateTime="now"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const handleNetwork = (_network) => {
    sessionStorage.setItem("network", _network);
    openInfoSB();
  };

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}
      >
        <MDBox>
          <MDTypography variant="h5">Settings</MDTypography>
        </MDBox>

        <Icon
          sx={({ typography: { size }, palette: { dark, white } }) => ({
            fontSize: `${size.lg} !important`,
            color: darkMode ? white.main : dark.main,
            stroke: "currentColor",
            strokeWidth: "2px",
            cursor: "pointer",
            transform: "translateY(5px)",
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </MDBox>
      <Divider />
      <MDBox display="block" justifyContent="start" alignItems="center" lineHeight={1}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <MDInput
            type="text"
            value={newNetwork}
            label="NETWORK ADDRESS"
            size="small"
            onChange={(e) => setNewNetwork(e.target.value)}
          />
          <MDButton
            variant="text"
            size="large"
            color={darkMode ? "white" : "dark"}
            onClick={() => handleNetwork(newNetwork)}
          >
            <Icon>check</Icon>
          </MDButton>
        </MDBox>
      </MDBox>
      {renderInfoSB}
      <Divider />
    </ConfiguratorRoot>
  );
}

export default Configurator;
