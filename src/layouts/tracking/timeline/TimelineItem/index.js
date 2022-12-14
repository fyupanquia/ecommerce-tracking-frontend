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

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Timeline context
import { useTimeline } from "examples/Timeline/context";

// Custom styles for the TimelineItem
import { styled } from "@mui/material/styles";
import timelineItem from "./styles";
import Badge from "../../FluxHeader";
import { tzToString } from "../../util/date";

const StyledBox = styled(MDBox)(({ theme }) => ({
  backgroundColor: "#fb8c00",
  "&::after": {
    color: "#fb8c00",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    animation: "ripple 1.2s infinite ease-in-out",
    border: "1px solid currentColor",
    content: '""',
  },
}));

function TimelineItem({ color, icon, title, started_at, ended_at, status, description, lastItem }) {
  const isDark = useTimeline();
  let tlBadge = null;
  
  if (status == "WAITING") {
    tlBadge = (
      <StyledBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="white"
        width="2rem"
        height="2rem"
        borderRadius="50%"
        position="absolute"
        top="8%"
        left="2px"
        zIndex={2}
        sx={{ fontSize: ({ typography: { size } }) => size.sm }}
      >
        <Icon fontSize="inherit">{icon}</Icon>
      </StyledBox>
    );
  } else {
    const colors = { SUCCESS: "#4CAF50", ERROR: "#F44335", OFFLINE: "#5f6368" };
    tlBadge = (
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgColor={colors[status] || colors.OFFLINE}
        color="white"
        width="2rem"
        height="2rem"
        borderRadius="50%"
        position="absolute"
        top="8%"
        left="2px"
        zIndex={2}
        sx={{ fontSize: ({ typography: { size } }) => size.sm }}
      >
        <Icon fontSize="inherit">{icon}</Icon>
      </MDBox>
    );
  }

  return (
    <MDBox position="relative" mb={3} sx={(theme) => timelineItem(theme, { lastItem, isDark })}>
      {tlBadge}
      <MDBox ml={5.75} pt={description ? 0.7 : 0.5} lineHeight={0} maxWidth="30rem">
        <MDTypography variant="button" fontWeight="medium" color={isDark ? "white" : "dark"}>
          {title}
        </MDTypography>
        {started_at ? (
          <MDBox mt={0.5}>
            <MDTypography variant="caption" color={isDark ? "secondary" : "text"}>
              Iniciado: {tzToString(started_at)}
            </MDTypography>
          </MDBox>
        ) : null}
        {ended_at ? (
          <MDBox mt={0.5}>
            <MDTypography variant="caption" color={isDark ? "secondary" : "text"}>
              Finalizado: {tzToString(ended_at)}
            </MDTypography>
          </MDBox>
        ) : null}
        <MDBox mt={2} mb={1.5}>
          {description ? (
            <MDTypography variant="button" color={isDark ? "white" : "dark"}>
              {description}
            </MDTypography>
          ) : null}
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of TimelineItem
TimelineItem.defaultProps = {
  color: "info",
  lastItem: false,
  description: "",
};

// Typechecking props for the TimelineItem
TimelineItem.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  //dateTime: PropTypes.string.isRequired,
  description: PropTypes.string,
  lastItem: PropTypes.bool,
};

export default TimelineItem;
