import { useState, useRef, useEffect } from "react";

// react-router-dom components
import { useNavigate, useParams } from "react-router-dom";

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

import "components/MDSelect/select.css";
import credentials from "credentials.json";
import FileUpload from "react-material-file-upload";

import Link from "@mui/material/Link";

function UsersNew() {
  const params = useParams();
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [projects, setProjects] = useState(null);
  const [project, setProject] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [profile, setProfile] = useState("CLIENTE");
  const [password, setPassword] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [files, setFiles] = useState([]);

  const onGoBack = () => {
    navigate("/modulos/agregar");
  };

  const onSave = () => {
    if (!files.length) {
      setAlert(
        <Grid item xs={12}>
          <MDAlert color="error" dismissible>
            <MDTypography variant="body2" color="white">
              Seleccione un archivo xslx para importar
            </MDTypography>
          </MDAlert>
        </Grid>
      );
      return;
    }

    const baseURL = `${credentials.SERVER_URL}/modules/import`;
    const body = {
      password,
      is_active: isActive,
      profile,
      filename: files[0].filename,
    };
    if (user && user.profile === "MASTER" && params && !params.id) {
      body.project_id = project;
    }

    setIsSaving(true);
    axios
      .post(baseURL, body, {
        headers: { Authorization: `Bearer ${user.access_token}` },
      })
      .then((response) => {
        setIsSaving(false);
        console.log(response);
        if (response.status == 201) {
          setPassword("");
          setFiles([]);

          setAlert(
            <Grid item xs={12}>
              <MDAlert color="success" dismissible>
                <MDTypography variant="body2" color="white">
                  ¡Módulos registrados{" "}
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
        setIsSaving(false);
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

  const uploadFile = (files) => {
    if (!files.length) {
      setFiles([]);
      return;
    }
    const myFile = files[0];
    const formData = new FormData();
    formData.append("file", myFile);
    axios
      .post(`${credentials.SERVER_URL}/files/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setFiles([response.data]);
      })
      .catch((e) => {
        if (e.response && e.response.status === 400) {
          setAlert(
            <Grid item xs={12}>
              <MDAlert color="error" dismissible>
                <MDTypography variant="body2" color="white">
                  ¡Sólo se permiten archivos de con formato{" "}
                  <MDTypography
                    component="a"
                    href="#"
                    variant="body2"
                    fontWeight="medium"
                    color="white"
                  >
                    xlsx
                  </MDTypography>
                  !
                </MDTypography>
              </MDAlert>
            </Grid>
          );
        }
      });
  };

  useEffect(() => {
    if (alert) {
      window.setTimeout(() => {
        setAlert(null);
      }, 5000);
    }
    return () => {};
  }, [alert]);

  useEffect(() => {
    setLoaded(true);
    if (user && user.profile === "MASTER") {
      axios
        .get(`${credentials.SERVER_URL}/projects`, {
          headers: { Authorization: `Bearer ${user.access_token}` },
        })
        .then((response) => {
          if (response.status === 200) {
            setProjects(response.data);
            setProject(response.data[0].project_id);
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
                  Importar módulos
                </MDTypography>
                <MDBox p={0}>
                  <MDButton variant="gradient" color="secondary" onClick={onGoBack} title="Atrás">
                    <Icon sx={{ fontWeight: "bold" }}>arrow_back_ios</Icon>
                  </MDButton>{" "}
                  <MDButton variant="gradient" color="secondary" title="Descargar plantilla">
                    <Link href={`${credentials.SERVER_URL}/modules-template.xlsx`} target="_blank">
                      <Icon sx={{ fontWeight: "bold" }}>download</Icon>
                    </Link>
                  </MDButton>
                </MDBox>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                {loaded ? (
                  <MDBox component="form" role="form">
                    {user && user.profile === "MASTER" && params && !params.id && projects ? (
                      <MDBox mb={2}>
                        <FormControl fullWidth name="select-project">
                          <InputLabel id="project">Proyecto</InputLabel>
                          <Select
                            labelId="project"
                            id="project"
                            label="Proyecto"
                            name="project"
                            defaultValue={project}
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
                    <Grid container>
                      <Grid item xs={12} md={12}>
                        <MDBox mb={4} textAlign="center">
                          <FileUpload
                            value={files}
                            onChange={uploadFile}
                            buttonText="Seleccionar"
                            title="Seleccione la plantilla en formato xslx"
                          />
                        </MDBox>
                      </Grid>
                    </Grid>
                    <MDBox mt={2} mb={1}>
                      {isSaving ? (
                        <Loading />
                      ) : (
                        <MDButton variant="gradient" color="primary" fullWidth onClick={onSave}>
                          Guardar
                        </MDButton>
                      )}
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
