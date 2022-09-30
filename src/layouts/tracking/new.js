import { useState, useRef, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate, useParams } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import MuiLink from "@mui/material/Link";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Images
import { useLocalStorage } from "providers/useLocalStorage";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import Tooltip from "@mui/material/Tooltip";

import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import DeleteCard from "./cards/deleteCard";

import MultipleSelectChip from "./select/chip";
import OrdersOverview from "./timeline";

function TasksNew() {
  const formEl = useRef();
  const params = useParams();
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [name, setName] = useState("");
  const [fluxHTML, setFluxesHTML] = useState([]);
  const [fluxes, setFluxes] = useState([]);
  const [flux, setFlux] = useState("");
  const [timeLine, setTimeLine] = useState("");

  const getInputs = () => {
    const iName = [...formEl.current.elements].find((e) => e.name === "name");
    return { iName };
  };

  const onGoBack = () => {
    navigate("/dashboard");
  };

  const onRequest = () => {
    const found = fluxes.find((f) => f.id == flux);
    console.log({ found });
    setTimeLine(<OrdersOverview modules={found.modules} />);
  };

  useEffect(() => {
    if (alert) {
      window.setTimeout(() => {
        setAlert(null);
      }, 5000);
    }
  }, [alert]);

  useEffect(() => {
    const baseURL = `http://localhost:3001/fluxes`;
    axios
      .get(baseURL, {
        headers: { Authorization: `Bearer ${user.access_token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          setFluxesHTML(
            response.data.map((f) => (
              <MenuItem key={f.id} value={f.id}>
                {f.name}
              </MenuItem>
            ))
          );
          setFluxes(response.data);
        }
      })
      .catch((e) => {
        console.log(e);
        onGoBack();
      });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          {alert}
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Seguimiento
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id="fluxes">Flujos</InputLabel>
                        <Select
                          labelId="fluxes"
                          id="fluxes"
                          label="Flujos"
                          name="fluxes"
                          defaultValue=""
                          value={flux}
                          onChange={(event) => {
                            setFlux(event.target.value);
                          }}
                        >
                          {fluxHTML}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <MDBox mb={2}>
                        <MDInput
                          type="text"
                          label="Identificador"
                          name="identificator"
                          variant="standard"
                          fullWidth
                        />
                      </MDBox>
                    </Grid>
                  </Grid>
                  <MDBox mt={2} mb={1}>
                    <MDButton variant="gradient" color="info" fullWidth onClick={onRequest}>
                      Consultar
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                {timeLine}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default TasksNew;
