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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

// Protocon Explorer React components
import PEOverviewAttribute from "components/PEOverviewAttribute";

function UserData({ gold, bankGold, hp, str, dex, cha, intel, vital }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      px={5}
      pb={3}
      mb={1}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            Details - User Data
          </MDTypography>
        </MDBox>
        <PEOverviewAttribute title="Gold" value={gold} />
        <PEOverviewAttribute title="Bank Gold" value={bankGold} />
        <PEOverviewAttribute title="HP" value={hp} />
        <PEOverviewAttribute title="Strength" value={str} />
        <PEOverviewAttribute title="Dexterity" value={dex} />
        <PEOverviewAttribute title="Charisma" value={cha} />
        <PEOverviewAttribute title="Intelligence" value={intel} />
        <PEOverviewAttribute title="Vital" value={vital} />
      </MDBox>
    </MDBox>
  );
}

// Typechecking props for the Bill
UserData.propTypes = {
  gold: PropTypes.number.isRequired,
  bankGold: PropTypes.number.isRequired,
  hp: PropTypes.number.isRequired,
  str: PropTypes.number.isRequired,
  dex: PropTypes.number.isRequired,
  cha: PropTypes.number.isRequired,
  intel: PropTypes.number.isRequired,
  vital: PropTypes.number.isRequired,
};

export default UserData;
