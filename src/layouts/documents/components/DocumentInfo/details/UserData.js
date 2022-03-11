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
import MDOverviewAttribute from "components/MDOverviewAttribute";

function UserData({ gold, bankGold, hp, str, dex, cha, intel, vital, noGutter }) {
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
      p={5}
      mb={noGutter ? 0 : 1}
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
        <MDOverviewAttribute title="Gold" value={gold} />
        <MDOverviewAttribute title="Bank Gold" value={bankGold} />
        <MDOverviewAttribute title="HP" value={hp} />
        <MDOverviewAttribute title="Strength" value={str} />
        <MDOverviewAttribute title="Dexterity" value={dex} />
        <MDOverviewAttribute title="Charisma" value={cha} />
        <MDOverviewAttribute title="Intelligence" value={intel} />
        <MDOverviewAttribute title="Vital" value={vital} />
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Bill
UserData.defaultProps = {
  noGutter: false,
};

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
  noGutter: PropTypes.bool,
};

export default UserData;
