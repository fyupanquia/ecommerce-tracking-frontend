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

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import axios from "axios";
import credentials from "credentials.json";
import DeleteCard from "./cards/deleteCard";

function TasksNew() {
  const formEl = useRef();
  const params = useParams();
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [name, setName] = useState("");
  const [output, setOutput] = useState("text");

  const getInputs = () => {
    const iName = [...formEl.current.elements].find((e) => e.name === "name");
    return { iName };
  };

  const onGoBack = () => {
    navigate("/tareas");
  };
  const onGoToImport = () => {
    navigate("/tareas/importar");
  };

  const onSave = ({ iName }) => {
    const baseURL = `${credentials.SERVER_URL}/tasks`;
    axios
      .post(
        baseURL,
        {
          name: iName.value,
          output,
        },
        {
          headers: { Authorization: `Bearer ${user.access_token}` },
        }
      )
      .then((response) => {
        if (response.status == 201) {
          setName("");

          setAlert(
            <Grid item xs={12}>
              <MDAlert color="success" dismissible>
                <MDTypography variant="body2" color="white">
                  ¡La tarea {iName.value} fue registrada{" "}
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
    const baseURL = `${credentials.SERVER_URL}/tasks/${id}`;
    axios
      .patch(
        baseURL,
        {
          name: iName.value,
          output,
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
                  ¡La tarea {iName.value} fue actualizada{" "}
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
      const baseURL = `${credentials.SERVER_URL}/tasks/${params.id}`;
      axios
        .get(baseURL, {
          headers: { Authorization: `Bearer ${user.access_token}` },
        })
        .then((response) => {
          if (response.status === 200) {
            const { iName } = getInputs();
            const { data } = response;
            setName(data.name);
            setOutput(data.output);
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
                  {params && params.id ? "Editar" : "Registrar"} tarea
                </MDTypography>
                <MDBox p={0}>
                  <MDButton variant="gradient" color="secondary" onClick={onGoBack} title="Atrás">
                    <Icon sx={{ fontWeight: "bold" }}>arrow_back_ios</Icon>
                  </MDButton>{" "}
                  {params && params.id ? null : (
                    <MDButton
                      variant="gradient"
                      color="secondary"
                      onClick={onGoToImport}
                      title="Importar"
                    >
                      <Icon sx={{ fontWeight: "bold" }}>attach_file</Icon>
                    </MDButton>
                  )}
                </MDBox>
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
                  <MDBox mb={2}>
                    <FormControl fullWidth name="select-output">
                      <InputLabel id="output">Salida</InputLabel>
                      <Select
                        labelId="output"
                        id="output"
                        label="Salida"
                        name="output"
                        defaultValue={output}
                        value={output}
                        onChange={(event) => {
                          setOutput(event.target.value);
                        }}
                      >
                        <MenuItem value="text">TEXT</MenuItem>
                        <MenuItem value="img">IMG</MenuItem>
                        <MenuItem value="map">MAP</MenuItem>
                        <MenuItem value="bool">BOOLEAN</MenuItem>
                      </Select>
                    </FormControl>
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
