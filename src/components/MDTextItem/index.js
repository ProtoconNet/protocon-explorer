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
import MDTypography from "components/MDTypography";

function MDTextItem({ content, link, url }) {
  return (
    <MDTypography
      variant="caption"
      color={link ? "link" : "text"}
      fontWeight="regular"
      letterSpacing={1}
      component="a"
      href={url}
      target="_self"
      rel="noreferrer"
    >
      {content}
    </MDTypography>
  );
}

MDTextItem.defaultProps = {
  link: false,
  url: "/",
};

MDTextItem.propTypes = {
  content: PropTypes.string.isRequired,
  link: PropTypes.bool,
  url: PropTypes.string,
};

export default MDTextItem;
