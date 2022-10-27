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
import Loading from "components/Loading";
import DeleteCard from "./cards/deleteCard";

import "components/MDSelect/select.css";
import credentials from "credentials.json";

function UsersNew() {
  const formEl = useRef();
  const params = useParams();
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [projects, setProjects] = useState(null);
  const [project, setProject] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [profile, setProfile] = useState("CLIENTE");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSetIsActive = () => setIsActive(!isActive);
  const [loaded, setLoaded] = useState(false);

  const getInputs = () => {
    const iFullname = [...formEl.current.elements].find((e) => e.name === "fullname");
    const iEmail = [...formEl.current.elements].find((e) => e.name === "email");
    const iPassword = [...formEl.current.elements].find((e) => e.name === "password");
    const iIsActive = [...formEl.current.elements].find((e) => e.name === "is_active");
    const iProfile = [...formEl.current.elements].find((e) => e.name === "profile");
    return { iFullname, iEmail, iPassword, iIsActive, iProfile };
  };

  const onGoBack = () => {
    navigate("/usuarios");
  };

  const onSave = ({ iFullname, iEmail, iPassword, iIsActive, iProfile }) => {
    let baseURL = `${credentials.SERVER_URL}/users`;
    const body = {
      fullname: iFullname.value,
      email: iEmail.value,
      password: iPassword.value,
      is_active: iIsActive.checked,
      profile: iProfile.value,
    };
    if (user && user.profile === "MASTER" && params && !params.id) {
      baseURL += "/register";
      body.project_id = project;
    }

    axios
      .post(baseURL, body, {
        headers: { Authorization: `Bearer ${user.access_token}` },
      })
      .then((response) => {
        if (response.status == 201) {
          setFullname("");
          setEmail("");
          setPassword("");

          setAlert(
            <Grid item xs={12}>
              <MDAlert color="success" dismissible>
                <MDTypography variant="body2" color="white">
                  ¡Usuario {iEmail.value} fue registrado{" "}
                  <MDTypography
                    component="a"
                    href="#"
                    variant="body2"
                    fontWeight="medium"
                    color="white"
                  >
                    correctamente
                  </MDTypography>
                  !
                </MDTypography>
              </MDAlert>
            </Grid>
          );
        }
      })
      .catch((e) => {
        if (e.response && e.response.data) {
          setAlert(
            <Grid item xs={12}>
              <MDAlert color="error" dismissible>
                <MDTypography variant="body2" color="white">
                  {e.response.data.message}
                </MDTypography>
              </MDAlert>
            </Grid>
          );
        }
      });
  };

  const onEdit = ({ id, iFullname, iEmail, iPassword, iIsActive, iProfile }) => {
    const baseURL = `${credentials.SERVER_URL}/users/${id}`;
    axios
      .patch(
        baseURL,
        {
          fullname: iFullname.value,
          email: iEmail.value,
          password: iPassword.value || undefined,
          is_active: iIsActive.checked,
          profile: iProfile.value,
        },
        {
          headers: { Authorization: `Bearer ${user.access_token}` },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          setAlert(
            <Grid item xs={12}>
              <MDAlert color="success" dismissible>
                <MDTypography variant="body2" color="white">
                  ¡Usuario {iEmail.value} fue actualizado{" "}
                  <MDTypography
                    component="a"
                    href="#"
                    variant="body2"
                    fontWeight="medium"
                    color="white"
                  >
                    correctamente
                  </MDTypography>
                  !
                </MDTypography>
              </MDAlert>
            </Grid>
          );
        }
      });
  };

  const onSubmit = () => {
    const { iFullname, iEmail, iPassword, iIsActive, iProfile } = getInputs();

    if (params && params.id) {
      onEdit({ id: params.id, iFullname, iEmail, iPassword, iIsActive, iProfile });
    } else {
      onSave({ iFullname, iEmail, iPassword, iIsActive, iProfile });
    }
  };

  useEffect(() => {
    if (alert) {
      window.setTimeout(() => {
        setAlert(null);
      }, 5000);
    }
  }, [alert]);

  useEffect(() => {
    if (params && params.id) {
      axios
        .get(`${credentials.SERVER_URL}/users/${params.id}`, {
          headers: { Authorization: `Bearer ${user.access_token}` },
        })
        .then((response) => {
          if (response.status === 200) {
            const { data } = response;
            setFullname(data.fullname);
            setEmail(data.email);
            setIsActive(data.is_active);
            setProfile(data.profile);
            setLoaded(true);
          }
        })
        .catch((e) => {
          console.log(e);
          onGoBack();
        });
    } else {
      setLoaded(true);
    }

    if (user && user.profile === "MASTER") {
      axios
        .get(`${credentials.SERVER_URL}/projects`, {
          headers: { Authorization: `Bearer ${user.access_token}` },
        })
        .then((response) => {
          if (response.status === 200) {
            setProjects(response.data);
            setProject(response.data[0].id);
          }
        })
        .catch((e) => {
          console.log(e);
          onGoBack();
        });
    }
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
                bgColor="primary"
                borderRadius="lg"
                coloredShadow="primary"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  {params && params.id ? "Editar" : "Registrar"} usuario
                </MDTypography>
                <MDButton variant="gradient" color="secondary" onClick={onGoBack}>
                  <Icon sx={{ fontWeight: "bold" }}>arrow_back_ios</Icon>
                  &nbsp;Volver
                </MDButton>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                {loaded ? (
                  <MDBox component="form" role="form" ref={formEl}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Nombres Completos"
                        name="fullname"
                        variant="standard"
                        value={fullname}
                        onChange={(e) => {
                          setFullname(e.target.value);
                        }}
                        fullWidth
                      />
                    </MDBox>
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
                    <MDBox p={0}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <MDBox mb={2}>
                            <FormControl fullWidth name="select-profile">
                              <InputLabel id="profile">Perfil</InputLabel>
                              <Select
                                labelId="profile"
                                id="profile"
                                label="Perfil"
                                name="profile"
                                defaultValue="CLIENTE"
                                value={profile}
                                onChange={(event) => {
                                  setProfile(event.target.value);
                                }}
                                classes="frank"
                              >
                                <MenuItem value="CLIENTE">CLIENTE</MenuItem>
                                <MenuItem value="ADMIN">ADMIN</MenuItem>
                                <MenuItem value="MASTER">MASTER</MenuItem>
                              </Select>
                            </FormControl>
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <MDBox display="flex" alignItems="center" ml={-1}>
                            <Switch
                              checked={isActive}
                              onChange={handleSetIsActive}
                              name="is_active"
                            />
                            <MDTypography
                              variant="button"
                              fontWeight="regular"
                              color="text"
                              onClick={handleSetIsActive}
                              sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                            >
                              &nbsp;&nbsp;Activo
                            </MDTypography>
                          </MDBox>
                        </Grid>
                      </Grid>
                    </MDBox>
                    {user && user.profile === "MASTER" && params && !params.id && projects ? (
                      <MDBox mb={2}>
                        <FormControl fullWidth name="select-project">
                          <InputLabel id="project">Proyecto</InputLabel>
                          <Select
                            labelId="project"
                            id="project"
                            label="Proyecto"
                            name="project"
                            defaultValue="CLIENTE"
                            value={project}
                            onChange={(event) => {
                              setProject(event.target.value);
                            }}
                          >
                            {projects
                              ? projects.map((p) => (
                                  <MenuItem key={p.id} value={p.id}>
                                    {p.name}
                                  </MenuItem>
                                ))
                              : null}
                          </Select>
                        </FormControl>
                      </MDBox>
                    ) : null}
                    <MDBox mb={2}>
                      <MDInput
                        type="password"
                        label="Contraseña"
                        name="password"
                        variant="standard"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2} mb={1}>
                      <MDButton variant="gradient" color="primary" fullWidth onClick={onSubmit}>
                        Guardar
                      </MDButton>
                    </MDBox>
                  </MDBox>
                ) : (
                  <Loading />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default UsersNew;
