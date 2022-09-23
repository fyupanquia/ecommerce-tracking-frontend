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

import Tooltip from "@mui/material/Tooltip";

import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Loading from "components/Loading";
import DeleteCard from "./cards/deleteCard";

function UsersProfile() {
  const formEl = useRef();
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [loaded, setLoaded] = useState(false);

  const getInputs = () => {
    const iFullname = [...formEl.current.elements].find((e) => e.name === "fullname");
    const iEmail = [...formEl.current.elements].find((e) => e.name === "email");
    const iPassword = [...formEl.current.elements].find((e) => e.name === "password");
    return { iFullname, iEmail, iPassword };
  };

  const onGoBack = () => {
    navigate("/usuarios");
  };

  const onEdit = ({ id, iFullname, iEmail, iPassword }) => {
    const baseURL = `http://localhost:3001/users/${id}`;
    axios
      .patch(
        baseURL,
        {
          fullname: iFullname.value,
          email: iEmail.value,
          password: iPassword.value || undefined,
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
    const { iFullname, iEmail, iPassword } = getInputs();

    onEdit({ id: user.id, iFullname, iEmail, iPassword });
  };

  useEffect(() => {
    if (alert) {
      window.setTimeout(() => {
        setAlert(null);
      }, 5000);
    }
  }, [alert]);

  useEffect(() => {
    if (user && user.id) {
      const baseURL = `http://localhost:3001/users/${user.id}`;
      axios
        .get(baseURL, {
          headers: { Authorization: `Bearer ${user.access_token}` },
        })
        .then((response) => {
          if (response.status === 200) {
            const { data } = response;
            setFullname(data.fullname);
            setEmail(data.email);
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
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
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
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        fullWidth
                      />
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
                    <MDBox mt={2} mb={1}>
                      <MDButton variant="gradient" color="info" fullWidth onClick={onSubmit}>
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
