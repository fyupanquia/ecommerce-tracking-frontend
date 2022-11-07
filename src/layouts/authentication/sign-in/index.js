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

import { useState, useRef, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useLocalStorage } from "providers/useLocalStorage";

import axios from "axios";
import MDAlert from "components/MDAlert";
import MDAvatar from "components/MDAvatar";
import credentials from "credentials.json";

function Basic() {
  const formEl = useRef();
  const [rememberMe, setRememberMe] = useState(false);
  const [user, setUser] = useLocalStorage("user", null);
  const [pendingUser, setPenddingUser] = useLocalStorage("pending_user", null);
  const [project, setProject] = useLocalStorage("project", null);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const onLogin = () => {
    const iEmail = [...formEl.current.elements].find((e) => e.name === "email");
    const iPassword = [...formEl.current.elements].find((e) => e.name === "password");
    const iRememberme = [...formEl.current.elements].find((e) => e.name === "rememberme");

    const baseURL = `${credentials.SERVER_URL}/auth/signin`;
    axios
      .post(baseURL, {
        email: iEmail.value,
        password: iPassword.value,
        project_id: project.id,
      })
      .then((response) => {
        if (response.status == 200) {
          // userData.token = response.data.access_token;
          setUser(response.data);
        }
      })
      .catch((e) => {
        console.log(e);
        if (e.response && e.response.data) {
          if (e.response.data.message === "EMAIL_NOT_CONFIRMED") {
            setPenddingUser({
              email: iEmail.value,
              project_id: project.id,
              type: "EMAIL"
            });
            window.location = "/confirm";
          } else if (e.response.data.message === "2FA_ENABLED") {
            setPenddingUser({
              email: iEmail.value,
              project_id: project.id,
              type: "2FA"
            });
            window.location = "/confirm";
          } else {
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
    if (user) {
      window.location.reload(false);
    }
  }, [user]);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="primary"
          borderRadius="lg"
          coloredShadow="primary"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            {project.name}
          </MDTypography>
          <Grid container justifyContent="center" sx={{ mt: 1, mb: 1 }}>
            <MDAvatar src={project.logo_url} alt="profile-image" size="xl" shadow="sm" />
          </Grid>
          <Grid container justifyContent="center">
            {project.facebook ? (
              <Grid item xs={2}>
                <MDTypography
                  component={MuiLink}
                  href={project.facebook}
                  target="_blank"
                  variant="body1"
                  color="white"
                >
                  <FacebookIcon color="inherit" />
                </MDTypography>
              </Grid>
            ) : null}
            {project.instagram ? (
              <Grid item xs={2}>
                <MDTypography
                  component={MuiLink}
                  href={project.instagram}
                  target="_blank"
                  variant="body1"
                  color="white"
                >
                  <InstagramIcon color="inherit" />
                </MDTypography>
              </Grid>
            ) : null}
            {project.youtube ? (
              <Grid item xs={2}>
                <MDTypography
                  component={MuiLink}
                  href={project.youtube}
                  target="_blank"
                  variant="body1"
                  color="white"
                >
                  <YouTubeIcon color="inherit" />
                </MDTypography>
              </Grid>
            ) : null}
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" ref={formEl}>
            {alert}
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth name="email" />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Contraseña" fullWidth name="password" />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} name="rememberme" />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Recordar
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="primary" fullWidth onClick={onLogin}>
                Iniciar sesión
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                ¿Aún no tienes una cuenta?{" "}
                <MDTypography
                  component={Link}
                  to="/sign-up"
                  variant="button"
                  color="primary"
                  fontWeight="medium"
                  textGradient
                >
                  Registrarse
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
/*
https://www.facebook.com/RipleyPeru
https://www.instagram.com/ripleyperu
https://www.youtube.com/user/TiendasRipleyPeru
*/
