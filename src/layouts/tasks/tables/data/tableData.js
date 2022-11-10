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

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { tzToString } from "util/date";
import Action from "./Action";

export default function data(data, user) {
  const Author = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );
  let columns = [
    { Header: "Tarea", accessor: "module", width: "40%", align: "left" },
    { Header: "Proyecto", accessor: "project", width: "30%", align: "left" },
    { Header: "Registrado", accessor: "registrado", width: "15%", align: "center" },
    { Header: "Acción", accessor: "action", width: "15%", align: "center" },
  ];
  const rows = data.map((r) => ({
    module: <Author name={r.name} />,
    project: r.project_id.name,
    registrado: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {tzToString(r.created_at, -5)}
      </MDTypography>
    ),
    action: <Action row={r} />,
  }));

  if (user.profile !== "MASTER") {
    columns = columns.filter((c) => c.accessor != "project");
  }
  return {
    columns,
    rows,
  };
}
