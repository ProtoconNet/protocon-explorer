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

import PropTypes from "prop-types";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function MDOverviewAttribute({ title, value, link, onClick }) {
  return (
    <MDBox mb={1} lineHeight={0}>
      <MDTypography variant="caption" color="text">
        {title}:&nbsp;&nbsp;&nbsp;
        <MDTypography
          variant="caption"
          fontWeight="medium"
          textTransform="capitalize"
          color={link ? "link" : "text"}
          textDecoration={link ? "underline" : "none"}
          onClick={onClick}
        >
          {value}
        </MDTypography>
      </MDTypography>
    </MDBox>
  );
}

MDOverviewAttribute.defaultProps = {
  link: false,
  onClick: () => {},
};

MDOverviewAttribute.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  link: PropTypes.bool,
  onClick: PropTypes.func,
};

export default MDOverviewAttribute;
