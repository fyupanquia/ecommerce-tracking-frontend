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
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

import { useLocalStorage } from "providers/useLocalStorage";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [useauth, setUser] = useLocalStorage("user", null);
  let content = null;
  if (useauth.profile == "CLIENTE") {
    content = (
      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Inicios de sesión"
                  description="Últimas conexiones"
                  date="Actualizado hace 5 minutos"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Compras"
                  description={
                    <>
                      (<strong>+10%</strong>) pedidos realizados
                    </>
                  }
                  date="Actualizado hace 1 hora"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Flujos"
                  description="Flujos concretados"
                  date="Actualizado hace 1 minuto"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    );
  } else {
    content = (
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="polyline"
                title="Flujos"
                count={36}
                percentage={{
                  color: "success",
                  amount: "+25%",
                  label: "recién actualizado",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="people"
                title="Nuevos usuarios del día"
                count="20"
                percentage={{
                  color: "success",
                  amount: "+1.5%",
                  label: "el último mes",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="all_inbox_icon"
                title="Módulos de hoy"
                count="10"
                percentage={{
                  color: "success",
                  amount: "+1.5%",
                  label: "ayer",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="inventory"
                title="Tareas"
                count="11"
                percentage={{
                  color: "success",
                  amount: "+0.5%",
                  label: "hoy",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Inicios de sesión"
                  description="Últimas conexiones"
                  date="Actualizado hace 5 minutos"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Ventas"
                  description={
                    <>
                      (<strong>+10%</strong>) ventas realizadas
                    </>
                  }
                  date="Actualizado hace 1 hora"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Flujos"
                  description="Flujos concretados"
                  date="Actualizado hace 1 minuto"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    );
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {content}
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
