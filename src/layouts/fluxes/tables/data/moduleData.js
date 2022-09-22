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
import { FormControlLabel, Icon, Radio, Tooltip } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import ModuleAction from "./moduleAction";

export default function ModuleData(data, { onUp, onDown, onDelete, onSelect }) {
  const Author = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  return {
    rows: data.map((r, i) => ({
      id: (
        <MDBox
          ml="auto"
          lineHeight={0}
          color={r.selected ? "success" : "dark"}
          onClick={() => onSelect(r)}
        >
          <Tooltip title="Seleccionar" placement="top">
            <Icon sx={{ cursor: "pointer" }} fontSize="small">
              check_circle
            </Icon>
          </Tooltip>
        </MDBox>
      ),
      module: <Author name={r.name} />,
      actions: (
        <ModuleAction
          row={r}
          onUp={i == 0 ? null : onUp}
          onDown={i === data.length - 1 ? null : onDown}
          onDelete={onDelete}
        />
      ),
    })),
  };
}
