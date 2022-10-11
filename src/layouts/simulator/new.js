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

import "components/MDSelect/select.css";
import arrBodies from "./data";
import FluxHeader from "./FluxHeader";
import Flux from "./flux";

function TasksNew() {
  const formEl = useRef();
  const params = useParams();
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [fluxHTML, setFluxesHTML] = useState([]);
  const [fluxes, setFluxes] = useState([]);
  const [flux, setFlux] = useState("");
  const [simulatorForm, setSimulatorForm] = useState("");
  const [body, setBody] = useState(null);
  const [counter, setCounter] = useState(null);
  const [timeoutID, setTimeoutID] = useState(null);
  const [isStopped, setIsStopped] = useState(false);
  const [controls, setControls] = useState(null);

  const onGoBack = () => {
    //    navigate("/dashboard");
  };

  useEffect(() => {
    console.log({ counter });
    if (typeof counter === "number" && counter <= arrBodies.length - 1) {
      const newTimeoutID = setTimeout(() => {
        setBody(arrBodies[counter]);
        setCounter(counter + 1);
      }, 3000);

      setTimeoutID(newTimeoutID);
      return () => {
        clearTimeout(newTimeoutID);
      };
    }
  }, [counter]);

  const onStop = () => {
    setIsStopped(true);
    clearTimeout(timeoutID);
    setControls(
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <MDBox mt={2} mb={1}>
            <MDButton variant="gradient" color="success" fullWidth onClick={onContinue}>
              <Icon fontSize="small">play_arrow</Icon> CONTINUAR
            </MDButton>
          </MDBox>
        </Grid>
        <Grid item xs={6}>
          <MDBox mt={2} mb={1}>
            <MDButton variant="gradient" color="info" fullWidth onClick={onReset}>
              <Icon fontSize="small">replay</Icon> REINICIAR
            </MDButton>
          </MDBox>
        </Grid>
      </Grid>
    );
  };
  const onContinue = () => {
    setIsStopped(false);
    setCounter(counter + 1);
  };
  const onReset = () => {
    clearTimeout(timeoutID);
    setCounter(0);
  };

  const onSimulate = () => {
    if (!flux) {
      setAlert(
        <Grid item xs={12}>
          <MDAlert color="error" dismissible>
            <MDTypography variant="body2" color="white">
              Seleccione el flujo a seguir
            </MDTypography>
          </MDAlert>
        </Grid>
      );
      return;
    }
    if (user.profile == "ADMIN" && !email.trim()) {
      setAlert(
        <Grid item xs={12}>
          <MDAlert color="error" dismissible>
            <MDTypography variant="body2" color="white">
              Ingrese el email del usuario
            </MDTypography>
          </MDAlert>
        </Grid>
      );
      return;
    }
    if (!code.trim()) {
      setAlert(
        <Grid item xs={12}>
          <MDAlert color="error" dismissible>
            <MDTypography variant="body2" color="white">
              Ingrese el código
            </MDTypography>
          </MDAlert>
        </Grid>
      );
      return;
    }
    const fluxBody = fluxes.find((f) => f.id === flux);
    if (!flux) {
      setAlert(
        <Grid item xs={12}>
          <MDAlert color="error" dismissible>
            <MDTypography variant="body2" color="white">
              Flujo no identificado
            </MDTypography>
          </MDAlert>
        </Grid>
      );
      return;
    }
    if (flux === 12) {
      setCounter(0);
      return;
    }
    const baseURL = `http://localhost:3001/tracking/${flux}-${email}-${code}`;
    axios
      .post(baseURL, fluxBody, {
        headers: { Authorization: `Bearer ${user.access_token}` },
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setBody(response.data);
        }
      })
      .catch((e) => {
        console.log(e);
        if (
          e.response &&
          e.response.status === 404 &&
          e.response.data &&
          e.response.data.message === "El seguimiento de este módulo no está habilitado"
        ) {
          setBody(null);
          setAlert(
            <Grid item xs={12}>
              <MDAlert color="warning" dismissible>
                <MDTypography variant="body2" color="white">
                  No se logró trackear esta solicitud
                </MDTypography>
              </MDAlert>
            </Grid>
          );
          return;
        }
        onGoBack();
      });
  };

  useEffect(() => {
    if (alert) {
      window.setTimeout(() => {
        setAlert(null);
      }, 5000);
    }
  }, [alert]);

  useEffect(() => {
    if (typeof body === "object" && body !== null && body.modules) {
      setSimulatorForm(<Flux body={body} />);
      setControls(
        <MDBox mt={2} mb={1}>
          <MDButton variant="gradient" color="error" fullWidth onClick={onStop}>
            <Icon fontSize="small">pause</Icon> DETENER
          </MDButton>
        </MDBox>
      );
    }
  }, [body]);

  useEffect(() => {
    const baseURL = `http://localhost:3001/fluxes`;
    axios
      .get(baseURL, {
        headers: { Authorization: `Bearer ${user.access_token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          setFluxesHTML(
            response.data
              .filter((f) => f.public)
              .map((f) => (
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

  const form = (
    <>
      <Grid item xs={4}>
        <MDBox mb={2} p={2}>
          <FormControl fullWidth name="select-modules">
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
        </MDBox>
      </Grid>
      <Grid item xs={4}>
        <MDBox mb={2} p={2}>
          <MDInput
            type="text"
            label="Email"
            name="email"
            variant="standard"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            fullWidth
          />
        </MDBox>
      </Grid>
      <Grid item xs={4}>
        <MDBox mb={2} p={2}>
          <MDInput
            type="text"
            label="Identificador"
            name="identificator"
            variant="standard"
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
            }}
            fullWidth
          />
        </MDBox>
      </Grid>
    </>
  );

  const controlsHTML = isStopped ? (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <MDBox mt={2} mb={1}>
          <MDButton variant="gradient" color="success" fullWidth onClick={onContinue}>
            <Icon fontSize="small">play_arrow</Icon> CONTINUAR
          </MDButton>
        </MDBox>
      </Grid>
      <Grid item xs={6}>
        <MDBox mt={2} mb={1}>
          <MDButton variant="gradient" color="info" fullWidth onClick={onReset}>
            <Icon fontSize="small">replay</Icon> REINICIAR
          </MDButton>
        </MDBox>
      </Grid>
    </Grid>
  ) : (
    <MDBox mt={2} mb={1}>
      <MDButton variant="gradient" color="error" fullWidth onClick={onStop}>
        <Icon fontSize="small">pause</Icon> DETENER
      </MDButton>
    </MDBox>
  );

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
                  Simulador
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <Grid container spacing={2}>
                    {form}
                  </Grid>
                  <MDBox mt={2} mb={1}>
                    <MDButton variant="gradient" color="info" fullWidth onClick={onSimulate}>
                      SIMULAR
                    </MDButton>
                  </MDBox>
                  {counter != null ? controlsHTML : null}
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox>{simulatorForm}</MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default TasksNew;
