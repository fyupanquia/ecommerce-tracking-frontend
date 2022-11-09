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
import credentials from "credentials.json";
import arrBodies from "./data";
import FluxHeader from "./FluxHeader";
import Flux from "./flux";

function convertTZ() {
  const date = new Date();
  const tzString = "America/Lima";
  const newDate = new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
  const padTwo0 = (arg) => `${arg}`.padStart(2, "0");

  return `${newDate.getFullYear()}-${padTwo0(newDate.getMonth() + 1)}-${padTwo0(
    newDate.getDate()
  )}T${padTwo0(newDate.getHours())}:${padTwo0(newDate.getMinutes())}:${padTwo0(
    newDate.getSeconds()
  )}.${newDate.getTimezoneOffset()}Z`;
}

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
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [moduleStartedDate, setModuleStartedDate] = useState("");
  const [taskStartedDate, setTaskStartedDate] = useState("");

  const onGoBack = () => {
    //    navigate("/dashboard");
  };

  // SIMULATING...
  useEffect(() => {
    console.log({ counter });
    let newTimeoutID;
    if (typeof counter === "number" && counter <= arrBodies.length - 1) {
      const lastBody = body;
      const newBody = arrBodies[counter];
      let iModuleFound = null;
      if (lastBody && counter > 0) {
        const iddleModules = lastBody.modules.filter((m, i) => {
          if (m.status === "WAITING") {
            iModuleFound = i;
          }
          return m.status === "SUCCESS";
        });
        // console.log({ iddleModules });
        // console.log({ rest: newBody.modules.slice(iModuleFound) });
        iModuleFound = typeof iModuleFound === "number" ? iModuleFound : newBody.modules.length;

        let iTaskFound;
        const iddleTasks = lastBody.modules[iModuleFound].tasks.filter((t, ii) => {
          if (t.status === "WAITING") {
            iTaskFound = ii;
          }
          return t.status === "SUCCESS";
        });
        iTaskFound =
          typeof iTaskFound === "number" ? iTaskFound : newBody.modules[iModuleFound].tasks.length;
        console.log({ iddleTasks });
        console.log({ rest: newBody.modules[iModuleFound].tasks.slice(iTaskFound) });

        newBody.modules[iModuleFound].tasks = [
          ...iddleTasks,
          ...newBody.modules[iModuleFound].tasks.slice(iTaskFound),
        ];

        newBody.modules = [...iddleModules, ...newBody.modules.slice(iModuleFound)];
      }

      // patching dates
      newBody.modules.map((m) => {
        if (m.status === "WAITING" && m.module_id.name !== selectedModule) {
          console.log("module changed");
          setSelectedModule(m.module_id.name);
          m.started_at = convertTZ();
          setModuleStartedDate(m.started_at);
        } else if (m.status === "WAITING" && m.module_id.name === selectedModule) {
          m.started_at = moduleStartedDate;
        } else if (m.status === "SUCCESS" && m.module_id.name == selectedModule) {
          m.started_at = moduleStartedDate;
          m.ended_at = convertTZ();
        }

        m.tasks.map((t) => {
          if (t.status === "WAITING" && `${t.id}-${t.task_id.name}` !== selectedTask) {
            setSelectedTask(`${t.id}-${t.task_id.name}`);
            t.started_at = convertTZ();
            setTaskStartedDate(t.started_at);
          } else if (t.status === "WAITING" && `${t.id}-${t.task_id.name}` === selectedTask) {
            t.started_at = taskStartedDate;
          } else if (t.status === "SUCCESS" && `${t.id}-${t.task_id.name}` == selectedTask) {
            t.started_at = taskStartedDate;
            t.ended_at = convertTZ();
          }
          return t;
        });

        return m;
      });

      const baseURL = `${credentials.SERVER_URL}/tracking`;

      console.time();
      setBody(newBody);
      axios
        .post(
          baseURL,
          { ...newBody, email, code },
          {
            headers: { Authorization: `Bearer ${user.access_token}` },
          }
        )
        .then((response) => {
          if (!isStopped) {
            newTimeoutID = setTimeout(() => {
              console.timeEnd();
              setCounter(counter + 1);
            }, 5000);
            setTimeoutID(newTimeoutID);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (typeof counter === "number" && counter > arrBodies.length - 1) {
      setCounter(null);
    }

    return () => {
      clearTimeout(newTimeoutID);
    };
  }, [counter]);

  const onStop = () => {
    setIsStopped(true);
    clearTimeout(timeoutID);
  };
  const onContinue = () => {
    setIsStopped(false);
    setCounter(counter + 1);
  };
  const onReset = () => {
    setIsStopped(false);
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
    if (user.profile == "MASTER" && !email.trim()) {
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
    setIsStopped(false);
    if (flux === 12) {
      setCounter(0);
      return;
    }
    const baseURL = `${credentials.SERVER_URL}/tracking/${flux}-${email}-${code}`;
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
    }
  }, [body]);

  // GETTING FLUXES
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
  }, []);

  const form = (
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
                bgColor="primary"
                borderRadius="lg"
                coloredShadow="primary"
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
                    <MDButton variant="gradient" color="primary" fullWidth onClick={onSimulate}>
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
