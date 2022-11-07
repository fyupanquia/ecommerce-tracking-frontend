import { useState, useRef, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

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
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Loading from "components/Loading";
import credentials from "credentials.json";
import FileUpload from "react-material-file-upload";
import MDAvatar from "components/MDAvatar";

function UsersProfile() {
  const formEl = useRef();
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [logoURL, setLogoURL] = useState(false);
  const [files, setFiles] = useState([]);
  const [twoFA, setTwoFA] = useState(false);
  const handleSet2FA = () => setTwoFA(!twoFA);
  const [authentication, setAuthentication] = useState("EMAIL");
  const [authentications, setAuthentications] = useState(["EMAIL", "PHONE"]);

  const onGoBack = () => {
    navigate("/usuarios");
  };

  const onEdit = ({ id }) => {
    axios
      .patch(
        `${credentials.SERVER_URL}/users/${id}`,
        {
          fullname,
          email,
          password: password || undefined,
          img_url: logoURL,
          twofa: authentication
        },
        {
          headers: { Authorization: `Bearer ${user.access_token}` },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          setUser({ ...user, ...response.data });
          setAlert(
            <Grid item xs={12}>
              <MDAlert color="success" dismissible>
                <MDTypography variant="body2" color="white">
                  ¡Usuario {email} fue actualizado{" "}
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
    onEdit({ id: user.id });
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
        window.location = "/perfil";
      }, 3000);
    }

    return () => {};
  }, [alert]);

  useEffect(() => {
    if (user && user.id) {
      const baseURL = `${credentials.SERVER_URL}/users/${user.id}`;
      axios
        .get(baseURL, {
          headers: { Authorization: `Bearer ${user.access_token}` },
        })
        .then((response) => {
          if (response.status === 200) {
            const { data } = response;
            setFullname(data.fullname);
            setEmail(data.email);
            setLogoURL(data.img_url);
            setLoaded(true);
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
                  Mi perfil
                </MDTypography>
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
                        disabled
                        /* onChange={(e) => {
                          setEmail(e.target.value);
                        }} */
                        fullWidth
                      />
                    </MDBox>
                    <Grid container>
                      <Grid item xs={12} md={8}>
                        <MDBox mb={4} textAlign="center">
                          <FileUpload
                            value={files}
                            onChange={uploadFile}
                            buttonText="Seleccionar"
                            title="Selecciona una imagen de perfil"
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
                    <MDBox p={0}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <MDBox display="flex" alignItems="center" ml={-1}>
                            <Switch checked={twoFA} onChange={handleSet2FA} name="twoFA" />
                            <MDTypography
                              variant="button"
                              fontWeight="regular"
                              color="text"
                              onClick={handleSet2FA}
                              sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                            >
                              &nbsp;&nbsp;Autenticación de doble factor (2FA)
                            </MDTypography>
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          {twoFA ? (
                            <MDBox mb={2}>
                              <FormControl fullWidth name="select-authentication">
                                <InputLabel id="authentication">2FA</InputLabel>
                                <Select
                                  labelId="authentication"
                                  id="authentication"
                                  label="2FA"
                                  name="authentication"
                                  defaultValue={authentication}
                                  value={authentication}
                                  onChange={(event) => {
                                    setAuthentication(event.target.value);
                                  }}
                                >
                                  {authentications
                                    ? authentications.map((p) => (
                                        <MenuItem key={p} value={p}>
                                          {p}
                                        </MenuItem>
                                      ))
                                    : null}
                                </Select>
                              </FormControl>
                            </MDBox>
                          ) : null}
                        </Grid>
                      </Grid>
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput
                        type="password"
                        label="Contraseña"
                        name="password"
                        variant="standard"
                        fullWidth
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
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

export default UsersProfile;
