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
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { useLocalStorage } from "providers/useLocalStorage";
import { tzToString } from "util/date";
import { stringAvatar } from "util/string";
import UserAction from "./UserAction";

export default function data(users, user) {
  const Author = ({ image, name, email, profile, email_confirmed }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {image ? <MDAvatar src={image} name={name} size="sm" /> : <Avatar {...stringAvatar(name)} />}
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
        <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
          {profile}
        </MDTypography>
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={email_confirmed ? "confirmado" : "sin confirmar"}
            color={email_confirmed ? "success" : "dark"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      </MDBox>
    </MDBox>
  );
  let columns = [
    { Header: "Usuario", accessor: "usuario", width: "20%", align: "left" },
    { Header: "Proyecto", accessor: "project", align: "left" },
    { Header: "Estado", accessor: "estado", align: "center" },
    { Header: "Registrado", accessor: "registrado", align: "center" },
    { Header: "Acción", accessor: "action", width: "15%", align: "center" },
  ];
  const rows = users.map((u) => ({
    usuario: (
      <Author
        image={u.img_url}
        name={u.fullname}
        email={u.email}
        profile={u.profile}
        email_confirmed={u.email_confirmed}
      />
    ),
    project: u.project_id.name,
    estado: (
      <MDBox ml={-1}>
        <MDBadge
          badgeContent={u.is_active ? "activo" : "desactivo"}
          color={u.is_active ? "success" : "dark"}
          variant="gradient"
          size="sm"
        />
      </MDBox>
    ),
    registrado: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {tzToString(u.created_at, -5)}
      </MDTypography>
    ),
    action: <UserAction user={u} />,
  }));
  if (user.profile !== "MASTER") {
    columns = columns.filter((c) => c.accessor != "project");
  }
  return {
    columns,
    rows,
  };
}

/*
{
author: <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
function: <Job title="Programator" description="Developer" />,
status: (
    <MDBox ml={-1}>
    <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
    </MDBox>
),
employed: (
    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    11/01/19
    </MDTypography>
),
action: (
    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    Edit
    </MDTypography>
),
}
*/
