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

import { useNavigate } from "react-router-dom";
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

// Data

import axios from "axios";
import { useLocalStorage } from "providers/useLocalStorage";
import usersTableData from "./tables/data/usersTableData";

function Tables() {
  const [users, setUsers] = useState(null);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const onAddUser = () => {
    navigate("/usuarios/agregar");
  };

  useEffect(() => {
    if (users === null) {
      const baseURL = "http://localhost:3001/users";

      axios
        .get(baseURL, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((response) => {
          if (response.status == 200) {
            setUsers(response.data);
          }
        });
    } else {
      const data = usersTableData(users);
      setColumns(data.columns);
      setRows(data.rows);
    }
  }, [users]);

  const body = (
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
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Tabla de usuarios
                </MDTypography>
                <MDButton variant="gradient" color="dark" onClick={onAddUser}>
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;Agregar
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );

  const loading = <span />;

  return users ? body : loading;
}

export default Tables;
