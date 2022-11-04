import { useState, useRef, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate, useParams } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
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

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import axios from "axios";
import credentials from "credentials.json";
import ColorPicker from "material-ui-color-picker";
import Button from "@mui/material/Button";
import FileUpload from "react-material-file-upload";
import MDAvatar from "components/MDAvatar";

function TasksNew() {
  const formEl = useRef();
  const params = useParams();
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#000");
  const [secondaryColor, setSecondaryColor] = useState("#000");
  const [logoURL, setLogoURL] = useState("");
  const [slug, setSlug] = useState("");
  const [files, setFiles] = useState([]);

  const getInputs = () => {
    const iName = [...formEl.current.elements].find((e) => e.name === "name");
    return { iName };
  };

  const onGoBack = () => {
    navigate("/proyectos");
  };

  const onSave = () => {
    const baseURL = `${credentials.SERVER_URL}/projects`;
    console.log({
      name,
      description,
      primaryColor,
      secondaryColor,
      logoURL,
      slug,
      files,
    });
    
    axios
      .post(
        baseURL,
        {
          name,
          description,
          primaryColor,
          secondaryColor,
          logo_url: logoURL,
          slug,
        },
        {
          headers: { Authorization: `Bearer ${user.access_token}` },
        }
      )
      .then((response) => {
        if (response.status == 201) {
          setName("");
          setDescription("");
          setSlug("");
          setLogoURL("");
          setFiles([]);
          setAlert(
            <Grid item xs={12}>
              <MDAlert color="success" dismissible>
                <MDTypography variant="body2" color="white">
                  ¡El proyecto {name} fue registrado{" "}
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
      }).catch((e) => {
        console.log(e);
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

  const onEdit = (id) => {
    const baseURL = `${credentials.SERVER_URL}/projects/${id}`;
    axios
      .patch(
        baseURL,
        {
          name,
          description,
          primaryColor,
          secondaryColor,
          logo_url: logoURL,
          slug,
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
                  ¡El proyecto {name} fue actualizado{" "}
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
    if (params && params.id) {
      onEdit(params.id);
    } else {
      onSave();
    }
  };

  const uploadFile = (files) => {
    if (!files.length) {
      setFiles([]);
      setLogoURL("");
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
        setFiles([myFile]);
        setLogoURL(`${credentials.SERVER_URL}/${response.data.filename}`);
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
                    imagen
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
  }, [alert]);

  useEffect(() => {
    if (params && params.id) {
      const baseURL = `${credentials.SERVER_URL}/projects/${params.id}`;
      axios
        .get(baseURL, {
          headers: { Authorization: `Bearer ${user.access_token}` },
        })
        .then((response) => {
          if (response.status === 200) {
            const { data } = response;
            setName(data.name);
            setDescription(data.description);
            setPrimaryColor(data.primaryColor);
            setSecondaryColor(data.secondaryColor);
            setLogoURL(data.logo_url);
            setSlug(data.slug);
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
                  {params && params.id ? "Editar" : "Registrar"} proyecto
                </MDTypography>
                <MDButton variant="gradient" color="secondary" onClick={onGoBack}>
                  <Icon sx={{ fontWeight: "bold" }}>arrow_back_ios</Icon>
                  &nbsp;Volver
                </MDButton>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form" ref={formEl}>
                  <MDBox mb={4}>
                    <MDInput
                      type="text"
                      label="Nombre"
                      name="name"
                      variant="standard"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={4}>
                    <MDInput
                      type="text"
                      label="Descripción"
                      name="description"
                      variant="standard"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      fullWidth
                    />
                  </MDBox>
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      Selecciona tu :
                      <MDBox mb={4} justifyContent="center" alignItems="center">
                        <ColorPicker
                          name="primaryColor"
                          defaultValue="Color Primario"
                          value={primaryColor}
                          onChange={(color) => {
                            setPrimaryColor(color);
                          }}
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      Selecciona tu :
                      <MDBox mb={4} justifyContent="center" alignItems="center">
                        <ColorPicker
                          name="secondaryColor"
                          defaultValue="Color Secundario"
                          value={secondaryColor}
                          onChange={(color) => setSecondaryColor(color)}
                        />
                      </MDBox>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} md={8}>
                      <MDBox mb={4} textAlign="center">
                        <FileUpload
                          value={files}
                          onChange={uploadFile}
                          buttonText="Seleccionar"
                          title="Selecciona un logo personalizado para tu proyecto"
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <MDBox textAlign="center" alignItems="center">
                        {logoURL ? (
                          <Grid container justifyContent="center" sx={{ mt: 1, mb: 1 }}>
                            <MDAvatar src={logoURL} alt="profile-image" size="xxl" shadow="xxl" />
                          </Grid>
                        ) : null}
                      </MDBox>
                    </Grid>
                  </Grid>
                  <MDBox mb={4}>
                    <MDInput
                      type="text"
                      label="Slug"
                      name="slug"
                      variant="standard"
                      value={slug}
                      onChange={(e) => {
                        setSlug(e.target.value);
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
