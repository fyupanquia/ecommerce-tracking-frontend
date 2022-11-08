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
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import BasicDatePicker from "components/BasicDatePicker";
import credentials from "credentials.json";
import { padTwo0, tzToString, getFormatedDate } from "util/date";
import MDAlert from "components/MDAlert";
import usersTableData from "./tables/data/usersTableData";

const dictionary = {
  usuarios: "user",
  proyectos: "project",
  flujos: "flux",
  modulos: "module",
  tareas: "task",
};

function Tables() {
  const temp = new Date();
  const today = new Date(temp.setHours(temp.getHours() - 12));
  const lastweek = new Date(new Date(today).setDate(today.getDate() - 6));
  const minDate = new Date(new Date(today).setDate(today.getDate() - 60));

  const params = useParams();
  const [items, setItems] = useState(null);
  const [users, setUsers] = useState(null);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [user, setUser] = useLocalStorage("user", null);
  const [project, setProject] = useLocalStorage("project", null);
  const [beginDate, setBeginDate] = useState(lastweek);
  const [endDate, setEndDate] = useState(today);
  const navigate = useNavigate();
  const [fileIDs, setFileIDs] = useState(null);
  const [alert, setAlert] = useState(null);

  const onGoBack = () => {
    navigate("/dashboard");
  };
  const onBeginDateChange = (val) => {
    setBeginDate(val.$d);
  };
  const onEndDateChange = (val) => {
    setEndDate(val.$d);
  };
  const onExportXlSX = () => {
    window
      .open(`${credentials.SERVER_URL}/reports/user/download_xlsx?id=${fileIDs.xlsxFile}`, "_blank")
      .focus();
  };
  const onExportPDF = () => {
    window
      .open(`${credentials.SERVER_URL}/reports/user/download_pdf?id=${fileIDs.pdfFile}`, "_blank")
      .focus();
  };
  const onSendEmail = () => {
    console.log("eh?")
    axios
      .post(
        `${credentials.SERVER_URL}/email/sendReport`,
        {
          xlsxFile: fileIDs.xlsxFile,
          pdfFile: fileIDs.pdfFile,
        },
        {
          headers: { Authorization: `Bearer ${user.access_token}` },
        }
      )
      .then((response) => {
        if (response.status == 201) {
          setAlert(
            <Grid item xs={12}>
              <MDAlert color="success" dismissible>
                <MDTypography variant="body2" color="white">
                  ¡Los reportes fueron enviado a su
                  <MDTypography
                    component="a"
                    href="#"
                    variant="body2"
                    fontWeight="medium"
                    color="white"
                  >
                    correo electrónico
                  </MDTypography>
                  !
                </MDTypography>
              </MDAlert>
            </Grid>
          );
        }
      });
  };
  const onRequest = () => {
    axios
      .get(
        `${credentials.SERVER_URL}/reports/${dictionary[params.item]}?begin_date=${getFormatedDate(
          beginDate
        )}&end_date=${getFormatedDate(endDate)}`,
        {
          headers: { Authorization: `Bearer ${user.access_token}` },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          setItems({
            // labels: Object.values(response.data.itemReport).map(i => (i.day)),
            labels: Object.keys(response.data.itemReport).map((i) => {
              const parts = i.split("-");
              return `${parts[2]}/${parts[1]}`;
            }),
            datasets: {
              label: "Proyectos",
              data: Object.values(response.data.itemReport).map((i) => i.val),
            },
          });
          const data = usersTableData(response.data.items, user);
          setColumns(data.columns);
          setRows(data.rows);
        }
      });
  };
  const onExport = () => {
    axios
      .get(
        `${credentials.SERVER_URL}/reports/${
          dictionary[params.item]
        }/generate?begin_date=${getFormatedDate(beginDate)}&end_date=${getFormatedDate(endDate)}`,
        {
          headers: { Authorization: `Bearer ${user.access_token}` },
        }
      )
      .then((response) => {
        console.log({ response });
        if (response.status == 200) {
          setFileIDs(response.data);
        }
      });
  };

  useEffect(() => {
    if (alert) {
      window.setTimeout(() => {
        setAlert(null);
      }, 5000);
    }
    return () => {};
  }, [alert]);

  
  useEffect(() => {
    onRequest();
  }, []);

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
                <MDBox p={0}>
                  <MDButton variant="gradient" color="secondary" onClick={onGoBack} title="Volver">
                    <Icon sx={{ fontWeight: "bold" }}>arrow_back_ios</Icon>
                  </MDButton>{" "}
                  <MDButton
                    variant="gradient"
                    color="secondary"
                    onClick={onExport}
                    title="Generar reporte"
                  >
                    <Icon sx={{ fontWeight: "bold" }}>get_app</Icon>
                  </MDButton>
                </MDBox>
              </MDBox>
              { alert }
              {fileIDs ? (
                <MDBox pt={1} pb={1} px={3}>
                  <Grid item xs={12}>
                    <MDAlert
                      color="info"
                      onClose={() => {
                        setFileIDs(null);
                      }}
                      dismissible
                    >
                      <MDTypography variant="body2" color="white">
                        ¡Tu reporte ha sido generado correctamente! {"   "}
                        <MDTypography
                          component="a"
                          href="#"
                          variant="body2"
                          fontWeight="medium"
                          color="white"
                        >
                          Puedes descargarlo en :
                        </MDTypography>
                      </MDTypography>
                      <MDBox pt={1} pb={1} px={3}>
                        <MDButton
                          variant="gradient"
                          color="success"
                          onClick={onExportXlSX}
                          title="Excel"
                        >
                          <Icon sx={{ fontWeight: "bold" }}>list_alt</Icon>
                        </MDButton>{" "}
                        <MDButton
                          variant="gradient"
                          color="error"
                          onClick={onExportPDF}
                          title="PDF"
                        >
                          <Icon>picture_as_pdf</Icon>
                        </MDButton>{" "}
                        <MDButton
                          variant="gradient"
                          color="secondary"
                          onClick={()=>onSendEmail()}
                          title="Email"
                        >
                          <Icon>mail</Icon>
                        </MDButton>
                      </MDBox>
                    </MDAlert>
                  </Grid>
                </MDBox>
              ) : null}
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDBox p={0}>
                    <Grid container>
                      <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
                        <BasicDatePicker
                          value={beginDate}
                          min={minDate}
                          max={today}
                          label="Fecha inicio"
                          onChange={onBeginDateChange}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
                        <BasicDatePicker
                          value={endDate}
                          min={minDate}
                          max={today}
                          label="Fecha fin"
                          onChange={onEndDateChange}
                        />
                      </Grid>
                    </Grid>
                  </MDBox>
                  <MDBox mt={2} mb={1}>
                    <MDButton variant="gradient" color="secondary" fullWidth onClick={onRequest}>
                      Aplicar filtro
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
              {items ? (
                <MDBox pt={1}>
                  <Grid item xs={12} md={12} lg={12}>
                    <MDBox mb={1}>
                      <ReportsLineChart
                        color="dark"
                        title={`${params.item}`}
                        description={`${params.item} encontrados ${rows.length}`}
                        date={`Desde: ${getFormatedDate(
                          beginDate,
                          "dd/mm/yyyy"
                        )} Hasta: ${getFormatedDate(endDate, "dd/mm/yyyy")}`}
                        chart={items}
                      />
                    </MDBox>
                  </Grid>
                </MDBox>
              ) : null}
              <MDBox pt={1}>
                {rows && rows.length ? (
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                ) : (
                  <Grid container spacing={6}>
                    <Grid item xs={12}>
                      <MDAlert color="info" dismissible>
                        <MDTypography variant="body2" color="white">
                          No se encontraron registros{" "}
                        </MDTypography>
                      </MDAlert>
                    </Grid>
                  </Grid>
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
