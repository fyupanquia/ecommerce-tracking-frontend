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
import DeleteCard from "./cards/deleteCard";

function UsersNew() {
  const formEl = useRef();
  const params = useParams();
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [question, setQuestion] = useState(null);

  const getInputs = () => {
    const iName = [...formEl.current.elements].find((e) => e.name === "name");
    return { iName };
  };

  const onGoBack = () => {
    navigate("/modules");
  };

  const onSave = ({ iName }) => {
    const baseURL = "http://localhost:3001/modules";
    axios
      .post(
        baseURL,
        {
          name: iName.value,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then((response) => {
        if (response.status == 201) {
          iName.value = "";

          setAlert(
            <Grid item xs={12} spacing={1}>
              <MDAlert color="success" dismissible>
                <MDTypography variant="body2" color="white">
                  ¡Módulo {iName.value} fue registrado{" "}
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

  const onEdit = ({ id, iName }) => {
    const baseURL = `http://localhost:3001/modules/${id}`;
    axios
      .patch(
        baseURL,
        {
          fullname: iName.value,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          setAlert(
            <Grid item xs={12} spacing={1}>
              <MDAlert color="success" dismissible>
                <MDTypography variant="body2" color="white">
                  ¡Móduo {iName.value} fue actualizado{" "}
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
    const { iName } = getInputs();
    if (params && params.id) {
      onEdit({ id: params.id, iName });
    } else {
      onSave({ iName });
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
      const baseURL = `http://localhost:3001/users/${params.id}`;
      axios
        .get(baseURL, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((response) => {
          if (response.status === 200) {
            const { iName, iEmail } = getInputs();
            const { data } = response;
            iName.value = data.fullname;
            iEmail.value = data.email;
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
                  {params && params.id ? "Editar" : "Registrar"} módulo
                </MDTypography>
                <MDButton variant="gradient" color="dark" onClick={onGoBack}>
                  <Icon sx={{ fontWeight: "bold" }}>arrow_back_ios</Icon>
                  &nbsp;Volver
                </MDButton>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form" ref={formEl}>
                  <MDBox mb={2}>
                    <MDInput type="text" label="Nombre" name="name" variant="standard" fullWidth />
                  </MDBox>
                  <MDBox mt={2} mb={1}>
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
