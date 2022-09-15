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

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useLocalStorage } from "providers/useLocalStorage";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import axios from "axios";
import data from "layouts/tables/data/authorsTableData";

function UsersNew() {
  const formEl = useRef();
  const params = useParams();
  const [rememberMe, setRememberMe] = useState(false);
  const [user, setUser] = useLocalStorage("user", null);
  const [usuario, setUsuario] = useState({});
  const navigate = useNavigate();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [alert, setAlert] = useState(null);

  const getInputs = () => {
    const iFullname = [...formEl.current.elements].find((e) => e.name === "fullname");
    const iEmail = [...formEl.current.elements].find((e) => e.name === "email");
    const iPassword = [...formEl.current.elements].find((e) => e.name === "password");
    return { iFullname, iEmail, iPassword };
  };
  const onSubmit = () => {
    const { iFullname, iEmail, iPassword } = getInputs();

    const baseURL = "http://localhost:3001/users";
    axios
      .post(
        baseURL,
        {
          fullname: iFullname.value,
          email: iEmail.value,
          password: iPassword.value,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then((response) => {
        if (response.status == 201) {
          iFullname.value = "";
          iEmail.value = "";
          iPassword.value = "";

          setAlert(
            <Grid item xs={12} spacing={1}>
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
      });
  };

  useEffect(() => {
    if (alert) {
      window.setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  }, [alert]);

  useEffect(() => {
    console.log({ params })
    if (params && params.id) {
      console.log({ params });
      const baseURL = `http://localhost:3001/users/${params.id}`;
      axios
        .get(baseURL, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((response) => {
          if (response.status === 200) {
            const { iFullname, iEmail } = getInputs();
            const { data } = response;
            iFullname.value = data.fullname;
            iEmail.value = data.email;
          }
        });
    }
  }, []);

  const onGoBack = () => {
    navigate("/usuarios");
  };

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
                  Registrar usuario
                </MDTypography>
                <MDButton variant="gradient" color="dark" onClick={onGoBack}>
                  <Icon sx={{ fontWeight: "bold" }}>arrow_back_ios</Icon>
                  &nbsp;Volver
                </MDButton>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form" ref={formEl}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Nombres Completos"
                      name="fullname"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput type="email" label="Email" name="email" variant="standard" fullWidth />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="password"
                      label="Contraseña"
                      name="password"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mt={4} mb={1}>
                    <MDButton variant="gradient" color="info" fullWidth onClick={onSubmit}>
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

export default UsersNew;
