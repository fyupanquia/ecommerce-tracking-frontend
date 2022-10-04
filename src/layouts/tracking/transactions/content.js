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
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";

// Billing page components
import Transaction from "layouts/billing/components/Transaction";

function Content({ task }) {
  return (
    <>
      <MDBox mb={2}>
        <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
          {task.task_id.name}
        </MDTypography>
      </MDBox>
      <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
        {task.task_id.value}
      </MDTypography>
    </>
  );
}

export default Content;
