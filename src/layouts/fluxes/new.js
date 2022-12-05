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
import {
  Box,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  RadioGroup,
  Select,
} from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import credentials from "credentials.json";
import MultipleSelectChip from "./select/chip";
import ModuleTable from "./tables/data/moduleTable";
import ModuleData from "./tables/data/moduleData";
import TaskData from "./tables/data/taskData";

const getTasks = ({ token }) => {
  const baseURL = `${credentials.SERVER_URL}/tasks`;
  return axios
    .get(baseURL, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    });
};
const getModules = ({ token }) => {
  const baseURL = `${credentials.SERVER_URL}/modules`;
  return axios
    .get(baseURL, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    });
};

function FluxesNew() {
  const navigate = useNavigate();
  const formEl = useRef();
  const params = useParams();
  const [user, setUser] = useLocalStorage("user", null);
  const [name, setName] = useState("");

  const [tasks, setTasks] = useState([]);
  const [modules, setModules] = useState([]);

  const [moduleColumns, setModuleColumns] = useState([
    { Header: "", accessor: "id", align: "center" },
    { Header: "Módulo", accessor: "module", width: "60%", align: "left" },
    { Header: "Acciones", accessor: "actions", width: "30%", align: "right" },
  ]);

  const [taskColumns, setTaskColumns] = useState([
    { Header: "Tarea", accessor: "module", align: "left" },
    { Header: "Acciones", accessor: "actions", width: "30%", align: "right" },
  ]);

  const [alert, setAlert] = useState(null);
  // const [disabledTaskButton, setDisabledTaskButton] = useState(true);
  const [body, setBody] = useState([]);

  const [moduleRows, setModuleRows] = useState([]);

  const [taskRows, setTaskRows] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);

  const [isPublic, setIsPublic] = useState(false);

  const getNameInput = () => [...formEl.current.elements].find((e) => e.name === "name");
  const getBodyRequest = () => {
    const clone = JSON.parse(JSON.stringify(body));
    const fluxname = getNameInput().value;
    return {
      name: fluxname,
      public: isPublic,
      modules: clone.map((m) => ({
        id: m.id,
        tasks: m.tasks.map((t) => ({
          id: t.id,
        })),
      })),
    };
  };

  const onGoBack = () => {
    navigate("/flujos");
  };

  const onGoToCode = () => {
    navigate(`/flujos/${params.id}/codigo`);
  };

  const onSave = (bodyRequest) => {
    const baseURL = `${credentials.SERVER_URL}/fluxes`;
    axios
      .post(baseURL, bodyRequest, {
        headers: { Authorization: `Bearer ${user.access_token}` },
      })
      .then((response) => {
        if (response.status == 201) {
          setAlert(
            <Grid item xs={12}>
              <MDAlert color="success" dismissible>
                <MDTypography variant="body2" color="white">
                  ¡El flujo {bodyRequest.name} fue registrado{" "}
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

  const onEdit = (id, bodyRequest) => {
    const baseURL = `${credentials.SERVER_URL}/fluxes/${id}`;
    axios
      .patch(baseURL, bodyRequest, {
        headers: { Authorization: `Bearer ${user.access_token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setAlert(
            <Grid item xs={12}>
              <MDAlert color="success" dismissible>
                <MDTypography variant="body2" color="white">
                  ¡El flujo {bodyRequest.value} fue actualizado{" "}
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
    const bodyRequest = getBodyRequest();
    if (params && params.id) {
      onEdit(params.id, bodyRequest);
    } else {
      onSave(bodyRequest);
    }
  };

  const handleSetIsPublic = () => setIsPublic(!isPublic);

  useEffect(() => {
    if (alert) {
      window.setTimeout(() => {
        setAlert(null);
      }, 5000);
    }
  }, [alert]);

  useEffect(async () => {
    const tasksFromAPI = await getTasks({ token: user.access_token });
    setTasks(tasksFromAPI);

    const modulesFromAPI = await getModules({ token: user.access_token });
    setModules(modulesFromAPI);

    if (params && params.id) {
      const baseURL = `${credentials.SERVER_URL}/fluxes/${params.id}`;
      axios
        .get(baseURL, {
          headers: { Authorization: `Bearer ${user.access_token}` },
        })
        .then((response) => {
          if (response.status === 200) {
            const { data: rsp } = response;
            setName(rsp.name);
            setIsPublic(rsp.public);
            const editBody = rsp.modules.map((m, i) => ({
              id: m.module_id.id,
              name: m.module_id.name,
              selected: i === 0,
              tasks: m.tasks.map((t) => ({ id: t.task_id.id, name: t.task_id.name })),
            }));
            setBody(editBody);
          }
        })
        .catch((e) => {
          console.log(e);
          onGoBack();
        });
    }
  }, []);

  const move = (arr, from, to) => {
    const clone = JSON.parse(JSON.stringify(arr));
    clone.splice(to, 0, clone.splice(from, 1)[0]);
    return clone;
  };
  const onUp = (data, item) => {
    const index = data.findIndex((d) => d.id === item.id);
    const newarr = move(data, index, index - 1 < 0 ? 0 : index - 1);
    return newarr;
  };
  const onDown = (data, item) => {
    const index = data.findIndex((d) => d.id === item.id);
    const newarr = move(data, index, index + 1 > data.length ? data.length : index + 1);
    return newarr;
  };
  const onDelete = (data, item) => {
    const clone = JSON.parse(JSON.stringify(data));
    let itWasSelected = false;
    const filtered = clone.filter((d) => {
      const found = d.id === item.id;
      if (found && d.selected) {
        itWasSelected = true;
      }
      return !found;
    });

    if (itWasSelected && filtered.length) {
      filtered[0].selected = true;
    }

    return filtered;
  };

  const taskSelectOnSubmit = (data) => {
    const newBody = JSON.parse(JSON.stringify(body));
    const foundModule = newBody.find((m) => m.selected);
    /*
    if (foundModule.tasks.length) {
      const mergedTasks = [...foundModule.tasks, ...data];
      const uniqueArray = mergedTasks.filter(
        (value, index) => index === mergedTasks.findIndex((obj) => obj.id === value.id)
      );
      foundModule.tasks = uniqueArray;
    } else {
    }
    */
    foundModule.tasks = data;
    setBody(newBody);
  };

  const moduleSelectOnSubmit = (data) => {
    const newBody = data.map((d) => ({
      id: d.id,
      name: d.name,
      selected: typeof d.selected === "boolean" ? d.selected : false,
      tasks: Array.isArray(d.tasks) ? d.tasks : [],
    }));
    setBody(newBody);
  };

  useEffect(() => {
    let newSelectedModule = null;
    if (body.length) {
      newSelectedModule = body.find((m) => m.selected);
    }
    const moduleData = ModuleData(body, {
      onUp: (item) => {
        moduleSelectOnSubmit(onUp(body, item));
      },
      onDown: (item) => {
        moduleSelectOnSubmit(onDown(body, item));
      },
      onDelete: (item) => {
        moduleSelectOnSubmit(onDelete(body, item));
      },
      onSelect: (item) => {
        const newBody = JSON.parse(JSON.stringify(body));
        newBody.map((m) => {
          m.selected = m.id === item.id;
          return m;
        });
        setBody(newBody);
      },
    });
    setModuleRows(moduleData.rows);

    if (newSelectedModule) {
      const taskData = TaskData(newSelectedModule.tasks, {
        onUp: (item) => {
          taskSelectOnSubmit(onUp(newSelectedModule.tasks, item));
        },
        onDown: (item) => {
          taskSelectOnSubmit(onDown(newSelectedModule.tasks, item));
        },
        onDelete: (item) => {
          taskSelectOnSubmit(onDelete(newSelectedModule.tasks, item));
        },
      });
      setTaskRows(taskData.rows);
    } else {
      setTaskRows([]);
    }
  }, [body]);

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
                  {params && params.id ? "Editar" : "Registrar"} flujo
                </MDTypography>
                <MDBox p={0}>
                  <MDButton variant="gradient" color="secondary" onClick={onGoBack} title="Atrás">
                    <Icon sx={{ fontWeight: "bold" }}>arrow_back_ios</Icon>
                  </MDButton>{" "}
                  {params && params.id ? (
                    <MDButton
                      variant="gradient"
                      color="secondary"
                      onClick={onGoToCode}
                      title="Importar"
                    >
                      <Icon sx={{ fontWeight: "bold" }}>code</Icon>
                    </MDButton>
                  ) : null}
                </MDBox>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form" ref={formEl}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <MDBox mb={2}>
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
                    </Grid>
                    <Grid item xs={6}>
                      <MDBox display="flex" alignItems="center" ml={-1}>
                        <Switch checked={isPublic} onChange={handleSetIsPublic} name="isPublic" />
                        <MDTypography
                          variant="button"
                          fontWeight="regular"
                          color="text"
                          onClick={handleSetIsPublic}
                          sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                        >
                          &nbsp;&nbsp;Habilitar seguimiento
                        </MDTypography>
                      </MDBox>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <MultipleSelectChip
                        label="Módulos"
                        submitLabel="AGREGAR MÓDULOS"
                        name="select-modules"
                        rows={modules}
                        disabledSubmit={false}
                        onSubmit={moduleSelectOnSubmit}
                      />
                      <DataTable
                        table={{ columns: moduleColumns, rows: moduleRows }}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                        noEndBorder
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <MultipleSelectChip
                        label="Tareas"
                        submitLabel="AGREGAR TAREAS"
                        name="select-tasks"
                        rows={tasks}
                        disabledSubmit={!body.length || body.find((m) => m.selected) === undefined}
                        onSubmit={taskSelectOnSubmit}
                      />
                      <DataTable
                        table={{ columns: taskColumns, rows: taskRows }}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                        noEndBorder
                      />
                    </Grid>
                  </Grid>

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

export default FluxesNew;
