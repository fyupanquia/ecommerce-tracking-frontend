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

import UserAction from "./UserAction"

export default function data(users) {


  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
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



  return {
    columns: [
      { Header: "usuario", accessor: "usuario", width: "30%", align: "left" },
      { Header: "function", accessor: "function", align: "left" },
      { Header: "estado", accessor: "estado", align: "center" },
      { Header: "registrado", accessor: "registrado", align: "center" },
      { Header: "action", accessor: "action", width: "20%", align: "center" },
    ],

    rows: users.map((user) => ({
      usuario: <Author image={team2} name={user.fullname} email={user.email} />,
      function: <Job title="Manager" description="Organization" />,
      estado: (
        <MDBox ml={-1}>
          <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
        </MDBox>
      ),
      registrado: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {new Date(user.created_at).toLocaleDateString()}
        </MDTypography>
      ),
      action: <UserAction user={user} />,
    })),
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
