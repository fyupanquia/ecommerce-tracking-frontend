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

import TimeLine from "./timeline";

import "components/MDSelect/select.css";
import FluxHeader from "./FluxHeader";
import io from "socket.io-client";
import { EmailRounded } from "@mui/icons-material";
import credentials from "credentials.json"
const socket = io(credentials.SERVER_URL);

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
  const [timeLine, setTimeLine] = useState("");
  const [body, setBody] = useState(null);
  const [eventListener, setEventListener] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);

  const onGoBack = () => {
    navigate("/dashboard");
  };

  const onTrack = () => {
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
    if (!email.trim()) {
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

    const baseURL = `${credentials.SERVER_URL}/tracking/${flux}-${email}-${code}`;
    axios
      .get(baseURL, {
        headers: { Authorization: `Bearer ${user.access_token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setBody(response.data);
        }
      })
      .catch((e) => {
        console.log(e);
        if (
          e.response &&
          e.response.status === 404 &&
          e.response.data &&
          (e.response.data.message === "El seguimiento de este módulo no está habilitado" ||
            e.response.data.message === "El flujo para este usuario no ha sido iniciado aún")
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
    if (user.profile === "CLIENTE") {
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (typeof body === "object" && body !== null && body.modules) {
      setTimeLine(<TimeLine modules={body.modules} />);
      socket.off(eventListener);
      const elistener = `${flux}:${email}:${code}`;
      setEventListener(elistener);
      socket.on(elistener, (message) => {
        setBody(message);
      });
    }
  }, [body]);

  useEffect(() => {
    const baseURL = `${credentials.SERVER_URL}/fluxes`;
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

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  let form;

  if (user.profile == "ADMIN" || user.profile == "MASTER") {
    form = (
      <>
        <Grid item xs={12} md={4}>
          <MDBox mb={2}>
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
        <Grid item xs={12} md={4}>
          <MDBox mb={2}>
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
        <Grid item xs={12} md={4}>
          <MDBox mb={2}>
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
  } else {
    form = (
      <>
        <Grid item xs={6}>
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
        <Grid item xs={6}>
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
  }

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
                bgColor="primary"
                borderRadius="lg"
                coloredShadow="primary"
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
                    {form}
                  </Grid>
                  <MDBox mt={2} mb={1}>
                    <MDButton variant="gradient" color="primary" fullWidth onClick={onTrack}>
                      Seguir
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                {body && <FluxHeader flux={body} />}
                {body &&
                body.modules.filter((m) => m.status === "SUCCESS").length ===
                  body.modules.length ? (
                  <Grid item xs={12}>
                    <MDAlert color="success">
                      <MDTypography variant="body2" color="white">
                        <MDTypography
                          component="a"
                          href="#"
                          variant="body2"
                          fontWeight="medium"
                          color="white"
                        >
                          ¡Felicidades!
                        </MDTypography>{" "}
                        Usted ha recibido su pedido :)
                      </MDTypography>
                    </MDAlert>{" "}
                  </Grid>
                ) : null}
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
