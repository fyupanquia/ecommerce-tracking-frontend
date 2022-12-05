import { useState, useRef, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate, useParams } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Images
import { useLocalStorage } from "providers/useLocalStorage";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import credentials from "credentials.json";
import MDAvatar from "components/MDAvatar";
import MDInput from "components/MDInput";
import ModuleCard from "./cards/module";

// https://github.com/rajinwonderland/react-code-blocks/blob/master/LANGUAGES.md
function FluxCode() {
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useLocalStorage("user", null);
  const [alert, setAlert] = useState(null);
  const [flux, setFlux] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [logoURL, setLogoURL] = useState(null);
  const [status, setStatus] = useState("SUCCESS");
  // SUCCESS|ERROR|LOADING|WAITING
  const onGoBack = () => {
    navigate(`/flujos/${params.id}`);
  };

  useEffect(() => {
    if (alert) {
      window.setTimeout(() => {
        setAlert(null);
      }, 5000);
    }
  }, [alert]);

  useEffect(async () => {
    if (params && params.id) {
      const baseURL = `${credentials.SERVER_URL}/fluxes/${params.id}`;
      axios
        .get(baseURL, {
          headers: { Authorization: `Bearer ${user.access_token}` },
        })
        .then((response) => {
          if (response.status === 200) {
            setFlux(response.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  useEffect(() => {
    setLogoURL(`${credentials.SERVER_URL}/${language}.png`);
  }, [language]);

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
                  Integrar flujo
                </MDTypography>
                <MDBox p={0}>
                  <MDButton variant="gradient" color="secondary" onClick={onGoBack} title="Atrás">
                    <Icon sx={{ fontWeight: "bold" }}>arrow_back_ios</Icon>
                  </MDButton>
                </MDBox>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <Grid container spacing={3}>
                  <Grid item xs={4} md={4}>
                    <MDBox mb={2}>
                      <MDInput
                        type="email"
                        label="Email"
                        name="email"
                        variant="standard"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <MDBox mb={2}>
                      <MDInput
                        type="code"
                        label="Código"
                        name="code"
                        variant="standard"
                        value={code}
                        onChange={(e) => {
                          setCode(e.target.value);
                        }}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>

                  <Grid item xs={4} md={4}>
                    <FormControl fullWidth name="select-status">
                      <InputLabel id="status">Estado de la tarea</InputLabel>
                      <Select
                        labelId="status"
                        id="status"
                        label="Estado de la tarea"
                        name="status"
                        defaultValue={status}
                        value={status}
                        onChange={(event) => {
                          setStatus(event.target.value);
                        }}
                      >
                        <MenuItem key="SUCCESS" value="SUCCESS">
                          Success
                        </MenuItem>
                        <MenuItem key="WAITING" value="WAITING">
                          Waiting
                        </MenuItem>
                        <MenuItem key="LOADING" value="LOADING">
                          Loading
                        </MenuItem>
                        <MenuItem key="ERROR" value="ERROR">
                          Error
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={6} md={6}>
                    <FormControl fullWidth name="select-language">
                      <InputLabel id="language">Lenguaje de Programación</InputLabel>
                      <Select
                        labelId="language"
                        id="language"
                        label="Lenguaje de Programación"
                        name="language"
                        defaultValue={language}
                        value={language}
                        onChange={(event) => {
                          setLanguage(event.target.value);
                        }}
                      >
                        <MenuItem key="javascript" value="javascript">
                          Javascript
                        </MenuItem>
                        <MenuItem key="php" value="php">
                          PHP
                        </MenuItem>
                        <MenuItem key="python" value="python">
                          Python
                        </MenuItem>
                        <MenuItem key="java" value="java">
                          Java
                        </MenuItem>
                        <MenuItem key="go" value="go">
                          Go
                        </MenuItem>
                        <MenuItem key="ruby" value="ruby">
                          Ruby
                        </MenuItem>
                        <MenuItem key="shell" value="shell">
                          Shell
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <MDBox textAlign="center" alignItems="center">
                      <Grid container justifyContent="center" sx={{ mt: 1, mb: 1 }}>
                        {logoURL ? (
                          <MDAvatar src={logoURL} alt={language} size="xxl" shadow="xxl" />
                        ) : null}
                      </Grid>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>

              <MDBox pb={3} px={3}>
                <Grid container spacing={3}>
                  {flux
                    ? flux.modules.map((m) => (
                        <Grid item xs={12} md={12} lg={12} key={m.id}>
                          <MDBox mb={1.5}>
                            <ModuleCard
                              color="dark"
                              icon={m.module_id.icon}
                              title={`Tareas (${m.tasks.length})`}
                              count={`Módulo: ${m.module_id.name}`}
                              tasks={m.tasks}
                              language={language}
                              email={email}
                              code={code}
                              status={status}
                            />
                          </MDBox>
                        </Grid>
                      ))
                    : null}
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default FluxCode;
