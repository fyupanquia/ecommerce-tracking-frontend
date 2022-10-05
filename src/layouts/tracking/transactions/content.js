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
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Badge from "@mui/material/Badge";
import CardMedia from "@mui/material/CardMedia";
import { styled, createTheme, ThemeProvider } from "@mui/system";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Map from "../map";
import credentials from "../../../credentials.json"

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

const themes = {
  SUCCESS: successTheme,
  WAITING: warningTheme,
  ERROR: errorTheme,
  OFFLINE: offlineTheme,
};
const StyledBadge = styled(Badge)(({ theme }) => ({
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

function Content({ task }) {
  let output;
  if (task.status == "SUCCESS") {
    if (task.type === "text") {
      output = (
        <MDTypography variant="button" color="text" fontWeight="light">
          {task.value}
        </MDTypography>
      );
    } else if (task.type === "img") {
      output = (
        <MDBox mx={2} mt={-3} p={2} mb={1} textAlign="center">
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <CardMedia
              src={task.value}
              component="img"
              title={task.task_id.name}
              sx={{
                maxWidth: "50%",
                margin: 0,
                boxShadow: ({ boxShadows: { md } }) => md,
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </Grid>
        </MDBox>
      );
    } else if (task.type == "bool") {
      output = (
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={task.value} aria-label="login switch" />}
            label={task.value ? "Finalizado" : "Pendiente"}
          />
        </FormGroup>
      );
    }
  } else if (task.status == "WAITING") {
    if (task.type === "map") {
      const lastMarker = task.value.pop();
      if(lastMarker) {
        console.log("lastMarker:: ", lastMarker)
        output = (
          <Map
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credentials.GOOGLE_API_KEY}`}
            containerElement={<div style={{ height: "400px" }} />}
            mapElement={<div style={{ height: "100%" }} />}
            loadingElement={<p>Cargando..</p>}
            marker={ lastMarker }
            onMarkerRightClick={ () => { console.log("clicked!!") } }
          />
        );
      }
    }
  } else if (task.status == "ERROR") {
    output = (
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="error">{task.value}</Alert>
      </Stack>
    );
  }
  return (
    <>
      <MDBox mb={2} display="flex" alignItems="flex-start">
        <MDBox color="text" mr={1} mt={0.5} lineHeight={0}>
          <ThemeProvider theme={themes[task.status] || themes.OFFLINE}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            />
          </ThemeProvider>
        </MDBox>
        <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
          {task.task_id.name}
        </MDTypography>
      </MDBox>
      <MDBox mb={2} lineHeight={1}>
        {output}
      </MDBox>
    </>
  );
}

export default Content;
