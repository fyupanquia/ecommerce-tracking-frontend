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
import tableData from "./tables/data/tableData";
import Loading from "components/Loading";
import credentials from "credentials.json"
function Orders() {
  const [orders, setOrders] = useState(null);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const onAddUser = () => {
    navigate("/tareas/agregar");
  };

  useEffect(() => {
    if (orders === null) {
      const baseURL = `${credentials.SERVER_URL}/orders`;

      axios
        .get(baseURL, {
          headers: { Authorization: `Bearer ${user.access_token}` },
        })
        .then((response) => {
          if (response.status == 200) {
            setOrders(response.data);
          }
        });
    } else {
      const data = tableData(orders);
      setColumns(data.columns);
      setRows(data.rows);
    }
  }, [orders]);

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
                bgColor="primary"
                borderRadius="lg"
                coloredShadow="primary"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Tabla de pedidos
                </MDTypography>
              </MDBox>
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

  const loading = <span />;

  return orders ? body : loading;
}

export default Orders;
