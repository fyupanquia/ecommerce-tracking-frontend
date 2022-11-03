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

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDInput from "components/MDInput";
// Data

import axios from "axios";
import { useLocalStorage } from "providers/useLocalStorage";
import Loading from "components/Loading";
import usersTableData from "./tables/data/usersTableData";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import credentials from "credentials.json"
function Tables() {
  const params = useParams();
  const [items, setItems] = useState(null);
  const [users, setUsers] = useState(null);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [user, setUser] = useLocalStorage("user", null);
  const [project, setProject] = useLocalStorage("project", null);
  const navigate = useNavigate();

  const onAddUser = () => {
    navigate("/usuarios/agregar");
  };

  useEffect(() => {
    const baseURL = `${credentials.SERVER_URL}/reports/projects?begin_date=2022-10-17&end_date=2022-11-02`;

    axios
      .get(baseURL, {
        headers: { Authorization: `Bearer ${user.access_token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setItems({
            //labels: Object.values(response.data.projectReport).map(i => (i.day)),
            labels: Object.keys(response.data.projectReport).map(i => {
              const parts = i.split("-");
              return `${parts[2]}/${parts[1]}`
            }),
            datasets: { label: "Proyectos", data: Object.values(response.data.projectReport).map(i => (i.val)) },
          })
          const data = usersTableData(response.data.projects, user);
          setColumns(data.columns);
          setRows(data.rows);
        }
      });
  }, [users]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
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
                  Resumen de {params.item}
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
              <MDBox p={0}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                      <MDInput
                      type="text"
                      label="Nombres Completos"
                      name="fullname"
                      variant="standard"
                      value=""
                      onChange={(e) => {
                        //setFullname(e.target.value);
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                        <MDInput
                        type="text"
                        label="Nombres Completos"
                        name="fullname"
                        variant="standard"
                        value=""
                        onChange={(e) => {
                          //setFullname(e.target.value);
                        }}
                        fullWidth
                      />
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox mt={2} mb={1}>
                <MDButton variant="gradient" color="primary" fullWidth onClick={()=>{}}>
                  Guardar
                </MDButton>
              </MDBox>
              </MDBox>
              </MDBox>
              {items ? <MDBox pt={6}>
                <Grid item xs={12} md={12} lg={12}>
                    <MDBox mb={3}>
                      <ReportsLineChart
                        color="dark"
                        title="Proyectos"
                        description={`Proyectos registrados`}
                        date="Actualizado hace 1 minuto"
                        chart={items}
                      />
                    </MDBox>
                  </Grid>
              </MDBox> : null }
              <MDBox pt={3}>
                {rows.length ? (
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
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

export default Tables;
