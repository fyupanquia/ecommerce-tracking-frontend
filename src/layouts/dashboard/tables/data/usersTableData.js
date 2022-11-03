/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";
import { tzToString } from "util/date";

export default function data(users, user) {
  let columns = [
    { Header: "Nombre", accessor: "name", width: "70%", align: "left" },
    { Header: "Registrado", accessor: "registered", align: "center" }
  ];
  const rows = users.map((u) => ({
    name: u.name,
    registered: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {tzToString(u.created_at, -5)}
      </MDTypography>
    ),
  }));
  return {
    columns,
    rows,
  };
}