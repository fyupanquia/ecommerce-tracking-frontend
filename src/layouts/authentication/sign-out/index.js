import { useState, useRef, useEffect } from "react";
import { AuthProvider, useAuth } from "providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "providers/useLocalStorage";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import { Card, Grid } from "@mui/material";
import Footer from "examples/Footer";

import Loading from "components/Loading";
import MDTypography from "components/MDTypography";

function SignOut() {
  const [user, setUser] = useLocalStorage("user", null);
  const [project, setProject] = useLocalStorage("project", null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUser(null);
      //setProject(null);
    } else {
      window.location = "/sign-in";
    }
  }, [user]);

  return (<DashboardLayout>
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
                  Cerrando Sesión
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <Loading />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>)
}

export default SignOut;
