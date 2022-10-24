import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

import Card from "@mui/material/Card";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
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
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const LegenddBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: theme.color,
    color: theme.color,
    boxShadow: `0 0 0 2px #fff`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: theme.animation ? "ripple 1.2s infinite ease-in-out" : "",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const errorTheme = createTheme({
  color: "#F44335",
});
const warningTheme = createTheme({
  color: "#fb8c00",
  animation: true,
});
const successTheme = createTheme({
  color: "#4CAF50",
});
const offlineTheme = createTheme({
  color: "#5f6368",
});

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
function stringAvatar(name) {
  const split = name.split(" ");
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${split[0][0]}${split.length > 1 ? split[1][0] : ""}`,
  };
}
export default function FluxHeader({ flux }) {
  return (
    <Grid container spacing={2} mb={2}>
      <Grid item xs={8}>
        <Card sx={{ height: "100%" }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar {...stringAvatar(flux.name)} />
              </StyledBadge>
            </Grid>
            <Grid item>
              <MDBox height="100%" mt={0.5} lineHeight={1}>
                <MDTypography variant="h5" fontWeight="medium">
                  {flux.name}
                </MDTypography>
                <MDTypography variant="button" color="text" fontWeight="regular">
                  {flux.email}
                </MDTypography>
              </MDBox>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card sx={{ height: "100%" }}>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={1} />
            <Grid item xs={5}>
              <MDBox color="text" mr={1}>
                <ThemeProvider theme={successTheme}>
                  <LegenddBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  />
                </ThemeProvider>
                <MDTypography variant="button" color="text" fontWeight="light" ml={1}>
                  Hecho
                </MDTypography>
              </MDBox>
              <MDBox color="text" mr={1}>
                <ThemeProvider theme={warningTheme}>
                  <LegenddBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  />
                </ThemeProvider>
                <MDTypography variant="button" color="text" fontWeight="light" ml={1}>
                  Cargando
                </MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={5}>
              <MDBox color="text" mr={1}>
                <ThemeProvider theme={errorTheme}>
                  <LegenddBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  />
                </ThemeProvider>
                <MDTypography variant="button" color="text" fontWeight="light" ml={1}>
                  Error
                </MDTypography>
              </MDBox>
              <MDBox color="text" mr={1}>
                <ThemeProvider theme={offlineTheme}>
                  <LegenddBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  />
                </ThemeProvider>
                <MDTypography variant="button" color="text" fontWeight="light" ml={1}>
                  Sin procesar
                </MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
