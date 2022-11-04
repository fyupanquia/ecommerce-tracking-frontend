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
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import { useLocalStorage } from "providers/useLocalStorage";
import { useEffect, useState } from "react";
import credentials from "credentials.json";
import axios from "axios";

function Dashboard() {
  //const { sales, tasks } = reportsLineChartData;
  const [users, setUsers] = useState(null);
  const [fluxes, setFluxes] = useState(null);
  const [modules, setModules] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [projects, setProjects] = useState(null);
  const [useauth, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  const content = null;

  useEffect(() => {
    axios
      .get(`${credentials.SERVER_URL}/reports/count-last-week`, {
        headers: { Authorization: `Bearer ${useauth.access_token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          console.log(response.data)
          const { userReport, fluxReport, moduleReport, taskReport, projectReport } = response.data;

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
          setProjects({
            labels: projectReport[0],
            datasets: { label: "Proyectos", data: projectReport[1] },
          });
        }
      });
  }, []);
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
  }

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
                    title={<MDBox mb={1}><MDButton variant="gradient" color="secondary" onClick={()=> goToDashboard('usuarios')}>
                    <Icon sx={{ fontWeight: "bold" }}>visibility</Icon>
                    &nbsp;Usuarios
                  </MDButton></MDBox>}
                    description={`${getPercentageData(users.datasets.data).amount} Usuarios registrados`}
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
                    title={<MDBox mb={1}><MDButton variant="gradient" color="info" onClick={()=> goToDashboard('flujos')}>
                    <Icon sx={{ fontWeight: "bold" }}>visibility</Icon>
                    &nbsp;Flujos
                  </MDButton></MDBox>}
                    description={`${getPercentageData(fluxes.datasets.data).amount} Flujos registrados`}
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
                    title={<MDBox mb={1}><MDButton variant="gradient" color="success" onClick={()=> goToDashboard('modulos')}>
                    <Icon sx={{ fontWeight: "bold" }}>visibility</Icon>
                    &nbsp;Módulos
                  </MDButton></MDBox>}
                    description={`${getPercentageData(modules.datasets.data).amount} Módulos registrados`}
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
                    title={<MDBox mb={1}><MDButton variant="gradient" color="warning" onClick={()=> goToDashboard('proyectos')}>
                    <Icon sx={{ fontWeight: "bold" }}>visibility</Icon>
                    &nbsp;Tareas
                  </MDButton></MDBox>}
                    description={`${getPercentageData(tasks.datasets.data).amount} Tareas registradas`}
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
                      title={<MDBox mb={1}><MDButton variant="gradient" color="primary" onClick={()=> goToDashboard('proyectos')}>
                      <Icon sx={{ fontWeight: "bold" }}>visibility</Icon>
                      &nbsp;Proyectos
                    </MDButton></MDBox>}
                      description={`${getPercentageData(projects.datasets.data).amount} Proyectos registrados`}
                      date="Actualizado hace 1 minuto"
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
                    title={<MDBox mb={1}><MDButton variant="gradient" color="secondary" onClick={()=> goToDashboard('usuarios')}>
                    <Icon sx={{ fontWeight: "bold" }}>visibility</Icon>
                    &nbsp;Usuarios
                  </MDButton></MDBox>}
                    description={`${getPercentageData(users.datasets.data).amount} Usuarios registrados`}
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
                    title={<MDBox mb={1}><MDButton variant="gradient" color="info" onClick={()=> goToDashboard('flujos')}>
                    <Icon sx={{ fontWeight: "bold" }}>visibility</Icon>
                    &nbsp;Flujos
                  </MDButton></MDBox>}
                    description={`${getPercentageData(fluxes.datasets.data).amount} Flujos registrados`}
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
                    title={<MDBox mb={1}><MDButton variant="gradient" color="success" onClick={()=> goToDashboard('modulos')}>
                    <Icon sx={{ fontWeight: "bold" }}>visibility</Icon>
                    &nbsp;Módulos
                  </MDButton></MDBox>}
                    description={`${getPercentageData(modules.datasets.data).amount} Módulos registrados`}
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
                    title={<MDBox mb={1}><MDButton variant="gradient" color="warning" onClick={()=> goToDashboard('proyectos')}>
                    <Icon sx={{ fontWeight: "bold" }}>visibility</Icon>
                    &nbsp;Tareas
                  </MDButton></MDBox>}
                    description={`${getPercentageData(tasks.datasets.data).amount} Tareas registradas`}
                    date="Actualizado hace 1 minuto"
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