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

import Action from "./Action";

export default function data(data) {
  const Author = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name.length > 35 ? `${name.substr(0, 35)}...` : name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
  return {
    columns: [
      { Header: "Pedido", accessor: "order", width: "40%", align: "left" },
      { Header: "Precio", accessor: "price", align: "center" },
      { Header: "Código", accessor: "code", align: "center" },
      { Header: "Acción", accessor: "action", width: "20%", align: "center" },
    ],

    rows: data.map((r) => ({
      order: <Author name={r.name} />,
      price: <Author name={r.price} />,
      code: <Author name={r.code} />,
      action: <Action row={r} />,
    })),
  };
}
