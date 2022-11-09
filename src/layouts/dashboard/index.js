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

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import { useNavigate } from "react-router-dom";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";

// Dashboard components
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import { useLocalStorage } from "providers/useLocalStorage";
import { useEffect, useState } from "react";
import credentials from "credentials.json";
import axios from "axios";
import { on, off } from "util/socket";

function Dashboard() {
  // const { sales, tasks } = reportsLineChartData;
  const [users, setUsers] = useState(null);
  const [fluxes, setFluxes] = useState(null);
  const [modules, setModules] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [projects, setProjects] = useState(null);
  const [useauth, setUser] = useLocalStorage("user", null);
  
  const navigate = useNavigate();
  const content = null;

  // updatedAt
  const UPDATE_EACH_X_SECONDS = 10;
  const [projectUpdatedAtCounter, setProjectUpdatedAtCounter] = useState(null);
  const [projectUpdatedAtLabel, setProjectUpdatedAtLabel] = useState("");
  const [projectTimeout, setProjectTimeout] = useState(null);

  const [userUpdatedAtCounter, setUserUpdatedAtCounter] = useState(null);
  const [userUpdatedAtLabel, setUserUpdatedAtLabel] = useState("");
  const [userTimeout, setUserTimeout] = useState(null);

  const [fluxUpdatedAtCounter, setFluxUpdatedAtCounter] = useState(null);
  const [fluxUpdatedAtLabel, setFluxUpdatedAtLabel] = useState("");
  const [fluxTimeout, setFluxTimeout] = useState(null);

  const [moduleUpdatedAtCounter, setModuleUpdatedAtCounter] = useState(null);
  const [moduleUpdatedAtLabel, setModuleUpdatedAtLabel] = useState("");
  const [moduleTimeout, setModuleTimeout] = useState(null);

  const [taskUpdatedAtCounter, setTaskUpdatedAtCounter] = useState(null);
  const [taskUpdatedAtLabel, setTaskUpdatedAtLabel] = useState("");
  const [taskTimeout, setTaskTimeout] = useState(null);

  useEffect(() => {
    axios
      .get(`${credentials.SERVER_URL}/reports/count-last-week`, {
        headers: { Authorization: `Bearer ${useauth.access_token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          const { userReport, fluxReport, moduleReport, taskReport, projectReport } = response.data;
          setProjectUpdatedAtCounter(0);
          setUserUpdatedAtCounter(0);
          setFluxUpdatedAtCounter(0);
          setModuleUpdatedAtCounter(0);
          setTaskUpdatedAtCounter(0);
          setProjects({
            labels: projectReport[0],
            datasets: { label: "Proyectos", data: projectReport[1] },
          });
          setUsers({
            labels: userReport[0],
            datasets: { label: "Usuarios", data: userReport[1] },
          });
          setFluxes({
            labels: fluxReport[0],
            datasets: { label: "Flujos", data: fluxReport[1] },
          });
          setModules({
            labels: moduleReport[0],
            datasets: { label: "Módulos", data: moduleReport[1] },
          });
          setTasks({
            labels: taskReport[0],
            datasets: { label: "Tareas", data: taskReport[1] },
          });
        }
      });
  }, []);

  const patchGraphicData = (store, setStore, type) => {
    /*
    console.log({ store });
    if (typeof store === "object" && store !== null) {
      const n = type === "removed" ? -1 : 1;
      store.datasets.data[store.datasets.data.length - 1] += n;
    }
    setStore(store);
    */

    console.log({ store });
    const newStore = [...store.datasets.data];
    console.log(`${store.label} ${type || "added"}`, newStore);
    const n = type === "removed" ? -1 : 1;
    newStore[newStore.length - 1] += n;
    console.log(`${store.label} ${type || "added"}`, newStore);
    setStore({
      labels: store.labels,
      datasets: { label: store.label, data: newStore },
    });
  };

  useEffect(() => {
    if (projects && users && fluxes && modules && tasks) {
      off("project_added");
      off("user_added");
      off("user_removed");
      off("flux_added");
      off("flux_removed");
      off("module_added");
      off("module_removed");
      off("task_added");
      off("task_removed");

      console.log("events!!");
      // DEFINING EVENTS
      on("project_added", (project) => {
        patchGraphicData(projects, setProjects);
        console.log({ projectTimeout });
        clearTimeout(projectTimeout);
        setProjectUpdatedAtCounter(0);
      });
      on("user_added", (user) => {
        patchGraphicData(users, setUsers);
        console.log({ userTimeout });
        clearTimeout(userTimeout);
        setUserUpdatedAtCounter(0);
      });
      on("user_removed", (user) => {
        patchGraphicData(users, setUsers, "removed");
        console.log({ userTimeout });
        clearTimeout(userTimeout);
        setUserUpdatedAtCounter(0);
      });
      on("flux_added", (flux) => {
        patchGraphicData(fluxes, setFluxes);
        console.log({ fluxTimeout });
        clearTimeout(fluxTimeout);
        setFluxUpdatedAtCounter(0);
      });
      on("flux_removed", (flux) => {
        patchGraphicData(fluxes, setFluxes, "removed");
        console.log({ fluxTimeout });
        clearTimeout(fluxTimeout);
        setFluxUpdatedAtCounter(0);
      });
      on("module_added", (module) => {
        patchGraphicData(modules, setModules);
        console.log({ moduleTimeout });
        clearTimeout(moduleTimeout);
        setModuleUpdatedAtCounter(0);
      });
      on("module_removed", (module) => {
        patchGraphicData(modules, setModules, "removed");
        console.log({ moduleTimeout });
        clearTimeout(moduleTimeout);
        setModuleUpdatedAtCounter(0);
      });
      on("task_added", (task) => {
        patchGraphicData(tasks, setTasks);
        console.log({ taskTimeout });
        clearTimeout(taskTimeout);
        setTaskUpdatedAtCounter(0);
      });
      on("task_removed", (task) => {
        patchGraphicData(tasks, setTasks, "removed");
        console.log({ taskTimeout });
        clearTimeout(taskTimeout);
        setTaskUpdatedAtCounter(0);
      });
      return () => {
        off("project_added");
        off("user_added");
        off("user_removed");
        off("flux_added");
        off("flux_removed");
        off("module_added");
        off("module_removed");
        off("task_added");
        off("task_removed");
      };
    }
  }, [projects, users, fluxes, modules, tasks]);
  const getPercentageIncrease = (numA, numB) =>
    numB <= 0 ? numA * 100 : ((numA - numB) / numB) * 100;
  const getPercentageData = (dataset) => {
    const today = dataset[dataset.length - 1];
    const yesterday = dataset[dataset.length - 2];
    const increase = getPercentageIncrease(today, yesterday);
    return {
      color: increase <= 0 ? "error" : "success",
      amount: `${increase > 0 ? `+${increase}` : increase}%`,
      label: "recién actualizado",
    };
  };
  const goToDashboard = (item) => {
    navigate(`/dashboard/${item}`);
  };

  useEffect(() => {
    let pTimeout = null;
    if (projectUpdatedAtCounter != null) {
      if (projectUpdatedAtCounter >= UPDATE_EACH_X_SECONDS) {
        setProjectUpdatedAtLabel(`Actualizado hace ${projectUpdatedAtCounter} segundos.`);
        pTimeout = window.setTimeout(() => {
          const newcounter = projectUpdatedAtCounter + UPDATE_EACH_X_SECONDS;
          setProjectUpdatedAtCounter(newcounter);
        }, UPDATE_EACH_X_SECONDS*1000);
      } else {
        setProjectUpdatedAtLabel(`Actualizado ahora mismo.`);
        pTimeout = window.setTimeout(() => {
          const newcounter = projectUpdatedAtCounter + UPDATE_EACH_X_SECONDS;
          setProjectUpdatedAtCounter(newcounter);
        }, UPDATE_EACH_X_SECONDS*1000);
      }
      setProjectTimeout(pTimeout);
    }
    return () => {
      clearTimeout(pTimeout);
    };
  }, [projectUpdatedAtCounter]);

  useEffect(() => {
    let pTimeout = null;
    if (userUpdatedAtCounter != null) {
      if (userUpdatedAtCounter >= UPDATE_EACH_X_SECONDS) {
        setUserUpdatedAtLabel(`Actualizado hace ${userUpdatedAtCounter} segundos.`);
        pTimeout = window.setTimeout(() => {
          const newcounter = userUpdatedAtCounter + UPDATE_EACH_X_SECONDS;
          setUserUpdatedAtCounter(newcounter);
        }, UPDATE_EACH_X_SECONDS*1000);
      } else {
        setUserUpdatedAtLabel(`Actualizado ahora mismo.`);
        pTimeout = window.setTimeout(() => {
          const newcounter = userUpdatedAtCounter + UPDATE_EACH_X_SECONDS;
          setUserUpdatedAtCounter(newcounter);
        }, UPDATE_EACH_X_SECONDS*1000);
      }
      setUserTimeout(pTimeout);
    }
    return () => {
      clearTimeout(pTimeout);
    };
  }, [userUpdatedAtCounter]);

  useEffect(() => {
    let pTimeout = null;
    if (fluxUpdatedAtCounter != null) {
      if (fluxUpdatedAtCounter >= UPDATE_EACH_X_SECONDS) {
        setFluxUpdatedAtLabel(`Actualizado hace ${fluxUpdatedAtCounter} segundos.`);
        pTimeout = window.setTimeout(() => {
          const newcounter = fluxUpdatedAtCounter + UPDATE_EACH_X_SECONDS;
          setFluxUpdatedAtCounter(newcounter);
        }, UPDATE_EACH_X_SECONDS*1000);
      } else {
        setFluxUpdatedAtLabel(`Actualizado ahora mismo.`);
        pTimeout = window.setTimeout(() => {
          const newcounter = fluxUpdatedAtCounter + UPDATE_EACH_X_SECONDS;
          setFluxUpdatedAtCounter(newcounter);
        }, UPDATE_EACH_X_SECONDS*1000);
      }
      setFluxTimeout(pTimeout);
    }
    return () => {
      clearTimeout(pTimeout);
    };
  }, [fluxUpdatedAtCounter]);


  useEffect(() => {
    let pTimeout = null;
    if (moduleUpdatedAtCounter != null) {
      if (moduleUpdatedAtCounter >= UPDATE_EACH_X_SECONDS) {
        setModuleUpdatedAtLabel(`Actualizado hace ${moduleUpdatedAtCounter} segundos.`);
        pTimeout = window.setTimeout(() => {
          const newcounter = moduleUpdatedAtCounter + UPDATE_EACH_X_SECONDS;
          setModuleUpdatedAtCounter(newcounter);
        }, UPDATE_EACH_X_SECONDS*1000);
      } else {
        setModuleUpdatedAtLabel(`Actualizado ahora mismo.`);
        pTimeout = window.setTimeout(() => {
          const newcounter = moduleUpdatedAtCounter + UPDATE_EACH_X_SECONDS;
          setModuleUpdatedAtCounter(newcounter);
        }, UPDATE_EACH_X_SECONDS*1000);
      }
      setModuleTimeout(pTimeout);
    }
    return () => {
      clearTimeout(pTimeout);
    };
  }, [moduleUpdatedAtCounter]);


  useEffect(() => {
    let pTimeout = null;
    if (taskUpdatedAtCounter != null) {
      if (taskUpdatedAtCounter >= UPDATE_EACH_X_SECONDS) {
        setTaskUpdatedAtLabel(`Actualizado hace ${taskUpdatedAtCounter} segundos.`);
        pTimeout = window.setTimeout(() => {
          const newcounter = taskUpdatedAtCounter + UPDATE_EACH_X_SECONDS;
          setTaskUpdatedAtCounter(newcounter);
        }, UPDATE_EACH_X_SECONDS*1000);
      } else {
        setTaskUpdatedAtLabel(`Actualizado ahora mismo.`);
        pTimeout = window.setTimeout(() => {
          const newcounter = taskUpdatedAtCounter + UPDATE_EACH_X_SECONDS;
          setTaskUpdatedAtCounter(newcounter);
        }, UPDATE_EACH_X_SECONDS*1000);
      }
      setTaskTimeout(pTimeout);
    }
    return () => {
      clearTimeout(pTimeout);
    };
  }, [taskUpdatedAtCounter]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {useauth.profile == "ADMIN" ? (
        <MDBox py={2}>
          <MDBox mt={4.5}>
            <Grid container spacing={2}>
              {users ? (
                <Grid item xs={12} md={6} lg={6}>
                  <MDBox mb={3}>
                    <ReportsLineChart
                      color="secondary"
                      title={
                        <MDBox mb={1}>
                          <MDButton
                            variant="gradient"
                            color="secondary"
                            onClick={() => goToDashboard("usuarios")}
                          >
                            <Icon sx={{ fontWeight: "bold" }}>visibility</Icon>
                            &nbsp;Usuarios
                          </MDButton>
                        </MDBox>
                      }
                      description={`${
                        getPercentageData(users.datasets.data).amount
                      } Usuarios registrados`}
                      date="Actualizado hace 1 minuto"
                      chart={users}
                    />
                  </MDBox>
                </Grid>
              ) : null}
              {fluxes ? (
                <Grid item xs={12} md={6} lg={6}>
                  <MDBox mb={3}>
                    <ReportsLineChart
                      color="info"
                      title={
                        <MDBox mb={1}>
                          <MDButton
                            variant="gradient"
                            color="info"
                            onClick={() => goToDashboard("flujos")}
                          >
                            <Icon sx={{ fontWeight: "bold" }}>visibility</Icon>
                            &nbsp;Flujos
                          </MDButton>
                        </MDBox>
                      }
                      description={`${
                        getPercentageData(fluxes.datasets.data).amount
                      } Flujos registrados`}
                      date="Actualizado hace 1 minuto"
                      chart={fluxes}
                    />
                  </MDBox>
                </Grid>
              ) : null}
              {modules ? (
                <Grid item xs={12} md={6} lg={6}>
                  <MDBox mb={3}>
                    <ReportsLineChart
                      color="success"
                      title={
                        <MDBox mb={1}>
                          <MDButton
                            variant="gradient"
                            color="success"
                            onClick={() => goToDashboard("modulos")}
                          >
                            <Icon sx={{ fontWeight: "bold" }}>visibility</Icon>
                            &nbsp;Módulos
                          </MDButton>
                        </MDBox>
                      }
                      description={`${
                        getPercentageData(modules.datasets.data).amount
                      } Módulos registrados`}
                      date="Actualizado hace 1 minuto"
                      chart={modules}
                    />
                  </MDBox>
                </Grid>
              ) : null}
              {tasks ? (
                <Grid item xs={12} md={6} lg={6}>
                  <MDBox mb={3}>
                    <ReportsLineChart
                      color="warning"
                      title={
                        <MDBox mb={1}>
                          <MDButton
                            variant="gradient"
                            color="warning"
                            onClick={() => goToDashboard("proyectos")}
                          >
                            <Icon sx={{ fontWeight: "bold" }}>visibility</Icon>
                            &nbsp;Tareas
                          </MDButton>
                        </MDBox>
                      }
                      description={`${
                        getPercentageData(tasks.datasets.data).amount
                      } Tareas registradas`}
                      date="Actualizado hace 1 minuto"
                      chart={tasks}
                    />
                  </MDBox>
                </Grid>
              ) : null}
            </Grid>
          </MDBox>
        </MDBox>
      ) : (
        <MDBox py={2}>
          <MDBox mt={4.5}>
            <Grid container spacing={2}>
              {projects ? (
                <Grid item xs={12} md={6} lg={6}>
                  <MDBox mb={3}>
                    <ReportsLineChart
                      color="primary"
                      title={
                        <MDBox mb={1}>
                          <MDButton
                            variant="gradient"
                            color="primary"
                            onClick={() => goToDashboard("proyectos")}
                          >
                            <Icon sx={{ fontWeight: "bold" }}>visibility</Icon>
                            &nbsp;Proyectos
                          </MDButton>
                        </MDBox>
                      }
                      description={`${
                        getPercentageData(projects.datasets.data).amount
                      } Proyectos registrados`}
                      date={projectUpdatedAtLabel}
                      chart={projects}
                    />
                  </MDBox>
                </Grid>
              ) : null}
              {users ? (
                <Grid item xs={12} md={6} lg={6}>
                  <MDBox mb={3}>
                    <ReportsLineChart
                      color="secondary"
                      title={
                        <MDBox mb={1}>
                          <MDButton
                            variant="gradient"
                            color="secondary"
                            onClick={() => goToDashboard("usuarios")}
                          >
                            <Icon sx={{ fontWeight: "bold" }}>visibility</Icon>
                            &nbsp;Usuarios
                          </MDButton>
                        </MDBox>
                      }
                      description={`${
                        getPercentageData(users.datasets.data).amount
                      } Usuarios registrados`}
                      date={userUpdatedAtLabel}
                      chart={users}
                    />
                  </MDBox>
                </Grid>
              ) : null}
              {fluxes ? (
                <Grid item xs={12} md={6} lg={6}>
                  <MDBox mb={3}>
                    <ReportsLineChart
                      color="info"
                      title={
                        <MDBox mb={1}>
                          <MDButton
                            variant="gradient"
                            color="info"
                            onClick={() => goToDashboard("flujos")}
                          >
                            <Icon sx={{ fontWeight: "bold" }}>visibility</Icon>
                            &nbsp;Flujos
                          </MDButton>
                        </MDBox>
                      }
                      description={`${
                        getPercentageData(fluxes.datasets.data).amount
                      } Flujos registrados`}
                      date={fluxUpdatedAtLabel}
                      chart={fluxes}
                    />
                  </MDBox>
                </Grid>
              ) : null}
              {modules ? (
                <Grid item xs={12} md={6} lg={6}>
                  <MDBox mb={3}>
                    <ReportsLineChart
                      color="success"
                      title={
                        <MDBox mb={1}>
                          <MDButton
                            variant="gradient"
                            color="success"
                            onClick={() => goToDashboard("modulos")}
                          >
                            <Icon sx={{ fontWeight: "bold" }}>visibility</Icon>
                            &nbsp;Módulos
                          </MDButton>
                        </MDBox>
                      }
                      description={`${
                        getPercentageData(modules.datasets.data).amount
                      } Módulos registrados`}
                      date={moduleUpdatedAtLabel}
                      chart={modules}
                    />
                  </MDBox>
                </Grid>
              ) : null}
              {tasks ? (
                <Grid item xs={12} md={6} lg={6}>
                  <MDBox mb={3}>
                    <ReportsLineChart
                      color="warning"
                      title={
                        <MDBox mb={1}>
                          <MDButton
                            variant="gradient"
                            color="warning"
                            onClick={() => goToDashboard("proyectos")}
                          >
                            <Icon sx={{ fontWeight: "bold" }}>visibility</Icon>
                            &nbsp;Tareas
                          </MDButton>
                        </MDBox>
                      }
                      description={`${
                        getPercentageData(tasks.datasets.data).amount
                      } Tareas registradas`}
                      date={taskUpdatedAtLabel}
                      chart={tasks}
                    />
                  </MDBox>
                </Grid>
              ) : null}
            </Grid>
          </MDBox>
        </MDBox>
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;

/* <Grid container spacing={2}>
            {users ? (
              <Grid item xs={12} md={6} lg={6}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="primary"
                    icon="people"
                    title="Usuarios creados hoy"
                    count={users.datasets.data[users.datasets.data.length - 1]}
                    percentage={getPercentageData(users.datasets.data)}
                  />
                </MDBox>
              </Grid>
            ) : null}
            {fluxes ? (
              <Grid item xs={12} md={6} lg={6}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="secondary"
                    icon="polyline"
                    title="Flujos creados hoy"
                    count={fluxes.datasets.data[fluxes.datasets.data.length - 1]}
                    percentage={getPercentageData(fluxes.datasets.data)}
                  />
                </MDBox>
              </Grid>
            ) : null}
          </Grid> */
