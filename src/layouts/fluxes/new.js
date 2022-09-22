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
import RadioGroupContext from "@mui/material/RadioGroup/RadioGroupContext";
import DeleteCard from "./cards/deleteCard";
import MultipleSelectChip from "./select/chip";
import ModuleTable from "./tables/data/moduleTable";
import ModuleData from "./tables/data/moduleData";
import TaskData from "./tables/data/taskData";

const getTasks = ({ token }) => {
  const baseURL = `http://localhost:3001/tasks`;
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
  const baseURL = `http://localhost:3001/modules`;
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

  const getInputs = () => {
    const iName = [...formEl.current.elements].find((e) => e.name === "name");
    return { iName };
  };

  const onGoBack = () => {
    navigate("/flujos");
  };

  const onSave = ({ iName }) => {
    const baseURL = "http://localhost:3001/tasks";
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
    const baseURL = `http://localhost:3001/tasks/${id}`;
    axios
      .patch(
        baseURL,
        {
          name: iName.value,
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

  useEffect(async () => {
    const tasksFromAPI = await getTasks({ token: user.token });
    setTasks(tasksFromAPI);

    const modulesFromAPI = await getModules({ token: user.token });
    setModules(modulesFromAPI);

    if (params && params.id) {
      const baseURL = `http://localhost:3001/fluxes/${params.id}`;
      axios
        .get(baseURL, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((response) => {
          if (response.status === 200) {
            const { iName } = getInputs();
            const { data } = response;
            iName.value = data.name;
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
  const onDelete = (data, item) => data.filter((d) => d.id !== item.id);

  const taskSelectOnSubmit = (data) => {
    console.log({ taskSelectOnSubmit: body });
    const newBody = JSON.parse(JSON.stringify(body));
    const foundModule = newBody.find((m) => m.selected);
    if (foundModule.tasks.length) {
      const mergedTasks = [...foundModule.tasks, ...data];
      const uniqueArray = mergedTasks.filter(
        (value, index) => index === mergedTasks.findIndex((obj) => obj.id === value.id)
      );
      foundModule.tasks = uniqueArray;
    } else {
      foundModule.tasks = data;
    }
    setBody(newBody);
  };

  const moduleSelectOnSubmit = (data) => {
    const newBody = data.map((d) => ({ id: d.id, name: d.name, tasks: [] }));
    setBody(newBody);
  };

  useEffect(() => {
    /*
    if (body.length) {
      const newSelectedModule = body.find((m) => m.selected);
      setSelectedModule(newSelectedModule);
      //taskSelectOnSubmit(newSelectedModule.tasks);
    } else {
      setSelectedModule(null);
      //taskSelectOnSubmit([]);
    }
    */
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
        /*
        const foundModule = newBody.find((m) => {
          m.selected = false;
          return m.id === item.id;
        });
        foundModule.selected = true;
        */
        setBody(newBody);
        // taskSelectOnSubmit(foundModule.tasks);
      },
    });
    setModuleRows(moduleData.rows);

    if (newSelectedModule) {
      // const foundModule = body.find((m) => m.id === newSelectedModule.id);
      // if (foundModule) {
      const taskData = TaskData(newSelectedModule.tasks, {
        onUp: () => {},
        onDown: () => {},
        onDelete: () => {},
      });
      setTaskRows(taskData.rows);
      // }
    }
  }, [body]);

  console.log({ body });
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
                  {params && params.id ? "Editar" : "Registrar"} flujo
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
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <MultipleSelectChip
                        label="Módulos"
                        submitLabel="AGREGAR MÓDULOS"
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

export default FluxesNew;
