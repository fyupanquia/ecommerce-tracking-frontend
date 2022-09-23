// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

import { useNavigate } from "react-router-dom";

function UserAction({ user }) {
  const navigate = useNavigate();

  const onDelete = (u) => {
    navigate(`/usuarios/eliminar/${u.id}`);
  };

  const onEdit = (u) => {
    navigate(`/usuarios/editar/${u.id}`);
  };

  return (
    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      <MDBox variant="gradient" display="flex" justifyContent="space-between" alignItems="center">
        <MDBox ml="auto" lineHeight={0} color="dark" onClick={() => onEdit(user)}>
          <Tooltip title="Editar" placement="top">
            <Icon sx={{ cursor: "pointer" }} fontSize="small">
              edit
            </Icon>
          </Tooltip>
        </MDBox>
        <MDBox ml="auto" lineHeight={0} color="error" onClick={() => onDelete(user)}>
          <Tooltip title="Eliminar" placement="top">
            <Icon sx={{ cursor: "pointer" }} fontSize="small">
              delete
            </Icon>
          </Tooltip>
        </MDBox>
      </MDBox>
    </MDTypography>
  );
}

export default UserAction;
