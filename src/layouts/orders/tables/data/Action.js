// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

import { useNavigate } from "react-router-dom";

function Action({ row }) {
  const navigate = useNavigate();

  const onEdit = (u) => {
    navigate(`/pedidos/ver/${u.id}`);
  };

  return (
    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      <MDBox variant="gradient" display="flex" justifyContent="space-between" alignItems="center">
        <MDBox ml="auto" lineHeight={0} color="dark" onClick={() => onEdit(row)}>
          <Tooltip title="Visualizar" placement="top">
            <Icon sx={{ cursor: "pointer" }} fontSize="small">
              visibility
            </Icon>
          </Tooltip>
        </MDBox>
      </MDBox>
    </MDTypography>
  );
}

export default Action;
