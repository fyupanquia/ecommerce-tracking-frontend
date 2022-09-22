// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

function ModuleAction({ row, onUp, onDown, onDelete }) {
  return (
    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      <MDBox variant="gradient" display="flex" justifyContent="space-between" alignItems="center">
        {onUp !== null ? (
          <MDBox ml="auto" lineHeight={0} color="dark" onClick={() => onUp(row)}>
            <Tooltip title="Subir" placement="top">
              <Icon sx={{ cursor: "pointer" }} fontSize="small">
                arrow_drop_up
              </Icon>
            </Tooltip>
          </MDBox>
        ) : null}
        {onDown !== null ? (
          <MDBox ml="auto" lineHeight={0} color="dark" onClick={() => onDown(row)}>
            <Tooltip title="Bajar" placement="top">
              <Icon sx={{ cursor: "pointer" }} fontSize="small">
                arrow_drop_down
              </Icon>
            </Tooltip>
          </MDBox>
        ) : null}
        <MDBox ml="auto" lineHeight={0} color="error" onClick={() => onDelete(row)}>
          <Tooltip title="Quitar" placement="top">
            <Icon sx={{ cursor: "pointer" }} fontSize="small">
              delete
            </Icon>
          </Tooltip>
        </MDBox>
      </MDBox>
    </MDTypography>
  );
}
export default ModuleAction;
