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

function PEOverviewAttribute({ title, value, url }) {
  return (
    <MDBox mb={1} lineHeight={0}>
      <MDTypography variant="caption" color="text" hidden>
        {title}:&nbsp;&nbsp;&nbsp;
        <MDTypography
          variant="caption"
          fontWeight="medium"
          color={url ? "link" : "text"}
          textDecoration={url ? "underline" : "none"}
          component="a"
          href={url}
          target="_self"
          rel="noreferrer"
        >
          {value}
        </MDTypography>
      </MDTypography>
    </MDBox>
  );
}

PEOverviewAttribute.defaultProps = {
  url: null,
};

PEOverviewAttribute.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  url: PropTypes.string,
};

export default PEOverviewAttribute;
