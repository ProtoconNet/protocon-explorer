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

function BlockSignData({ filehash, creator, title, size, signers }) {
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
            Details - BlockSign Data
          </MDTypography>
        </MDBox>
        <PEOverviewAttribute title="File Hash" value={filehash} />
        <PEOverviewAttribute
          title="Creator"
          value={`(${creator.signcode}) ${creator.address} - ${
            creator.signed ? "signed" : "unsigned"
          }`}
          url={`/account/${creator.address}`}
        />
        <PEOverviewAttribute title="Title" value={title} />
        <PEOverviewAttribute title="Size" value={size} />
        {signers.map((signer, idx) => (
          <PEOverviewAttribute
            title={`Signer ${idx}`}
            value={`(${signer.signcode}) ${signer.address} - ${
              signer.signed ? "signed" : "unsigned"
            }`}
            url={`account/${signer.address}`}
          />
        ))}
      </MDBox>
    </MDBox>
  );
}

// Typechecking props for the Bill
BlockSignData.propTypes = {
  filehash: PropTypes.string.isRequired,
  creator: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  signers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BlockSignData;
