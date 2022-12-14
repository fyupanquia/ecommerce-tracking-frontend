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

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function DefaultInfoCard({ color, icon, title, description, value, onRemove, onCancel }) {
  return (
    <Card>
      <MDBox p={2} mx={3} display="flex" justifyContent="center">
        <MDBox
          display="grid"
          justifyContent="center"
          alignItems="center"
          bgColor="white"
          color="error"
          variant="gradient"
        >
          <Icon fontSize="default">delete_forever</Icon>
        </MDBox>
      </MDBox>
      <MDBox pb={2} px={2} textAlign="center" lineHeight={1.25}>
        <MDTypography variant="h4" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
        {description && (
          <MDTypography variant="caption" color="text" fontWeight="regular">
            {description}
          </MDTypography>
        )}
        {description && !value ? null : <Divider />}

        <Grid item xs={12} display="flex" justifyContent="center">
          <MDBox pb={2} px={2} textAlign="center">
            <MDButton variant="gradient" color="info" onClick={onCancel}>
              CANCELAR&nbsp;
              <Icon sx={{ fontWeight: "bold" }}>cancel</Icon>
            </MDButton>
          </MDBox>
          <MDBox pb={2} px={2} textAlign="center">
            <MDButton variant="gradient" color="error" onClick={onRemove}>
              ACEPTAR&nbsp;
              <Icon sx={{ fontWeight: "bold" }}>delete</Icon>
            </MDButton>
          </MDBox>
        </Grid>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of DefaultInfoCard
DefaultInfoCard.defaultProps = {
  color: "info",
  value: "",
  description: "",
};

// Typechecking props for the DefaultInfoCard
DefaultInfoCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DefaultInfoCard;
