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
  const [pendingUser, setPenddingUser] = useLocalStorage("pending_user", null);
  const [project, setProject] = useLocalStorage("project", null);
  const [user, setUser] = useLocalStorage("user", null);

  const [disabledDigit1, setisabledDigit1] = useState(false);
  const [disabledDigit2, setisabledDigit2] = useState(false);
  const [disabledDigit3, setisabledDigit3] = useState(false);
  const [disabledDigit4, setisabledDigit4] = useState(false);

  const [digit1, setDigit1] = useState("");
  const [digit2, setDigit2] = useState("");
  const [digit3, setDigit3] = useState("");
  const [digit4, setDigit4] = useState("");

  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const setDigitValue = (e) => {
    const val = e.target.value.trim();
    if (val.length > 1) return;

    const command = "setDigit4";
    switch (e.target.name) {
      case "digit-1":
        setDigit1(val);
        break;
      case "digit-2":
        setDigit2(val);
        break;
      case "digit-3":
        setDigit3(val);
        break;
      case "digit-4":
        setDigit4(val);
        break;
      default:
        console.log("digit input not found");
        break;
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
    if (digit1.length && digit2.length && digit3.length && digit4.length) {
      setisabledDigit1(true);
      setisabledDigit2(true);
      setisabledDigit3(true);
      setisabledDigit4(true);

      axios
        .post(`${credentials.SERVER_URL}/users/confirm`, {
          email: pendingUser.email,
          project_id: pendingUser.project_id,
          confirmation_code: `${digit1}${digit2}${digit3}${digit4}`,
          type: pendingUser.type,
        })
        .then((response) => {
          if (response.status == 201) {
            setPenddingUser(null);
            setUser(response.data);
          }
        })
        .catch((e) => {
          console.log(e);
          if (e.response && e.response.data) {
            setDigit1("");
            setDigit2("");
            setDigit3("");
            setDigit4("");
            setisabledDigit1(false);
            setisabledDigit2(false);
            setisabledDigit3(false);
            setisabledDigit4(false);
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
    }
  }, [digit1, digit2, digit3, digit4]);

  useEffect(() => {
    if (!pendingUser) {
      window.location = "/sign-in";
    }
  }, [pendingUser]);

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
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            {alert}
            <MDBox p={0}>
              <Grid container spacing={3}>
                <Grid item xs={3} md={3}>
                  <MDInput
                    type="text"
                    label=""
                    fullWidth
                    name="digit-1"
                    value={digit1}
                    disabled={disabledDigit1}
                    onChange={setDigitValue}
                  />
                </Grid>
                <Grid item xs={3} md={3}>
                  <MDInput
                    type="text"
                    label=""
                    fullWidth
                    name="digit-2"
                    value={digit2}
                    disabled={disabledDigit2}
                    onChange={setDigitValue}
                  />
                </Grid>
                <Grid item xs={3} md={3}>
                  <MDInput
                    type="text"
                    label=""
                    fullWidth
                    name="digit-3"
                    value={digit3}
                    disabled={disabledDigit3}
                    onChange={setDigitValue}
                  />
                </Grid>
                <Grid item xs={3} md={3}>
                  <MDInput
                    type="text"
                    label=""
                    fullWidth
                    name="digit-4"
                    value={digit4}
                    disabled={disabledDigit4}
                    onChange={setDigitValue}
                  />
                </Grid>
              </Grid>
            </MDBox>
            {pendingUser && pendingUser.type === "EMAIL" ? (
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" fontWeight="bold">
                  Ingresa el código de confirmación{" "}
                </MDTypography>
                <MDTypography variant="button">
                  que fue enviado a tu correo electrónico
                </MDTypography>
              </MDBox>
            ) : (
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" fontWeight="bold">
                  Ingresa el código de autenticación{" "}
                </MDTypography>
              </MDBox>
            )}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
