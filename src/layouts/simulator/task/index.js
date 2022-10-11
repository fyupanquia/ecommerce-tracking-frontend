import { useState, useEffect } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import CardMedia from "@mui/material/CardMedia";
import Map from "../../tracking/map";
import credentials from "../../../credentials.json";

function Task({ task }) {
  let field = null;
  const [bool, setBool] = useState(false);
  const [TaskValue, setTaskValue] = useState("");
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (task.task_id.output === "text" || task.task_id.output === "img") {
      setTaskValue(task.outputValue || "");
    } else if (task.task_id.output === "bool") {
      setBool(typeof task.outputValue === "boolean" ? task.outputValue : false);
    } else if (task.task_id.output === "map") {
      if (Array.isArray(task.outputValue)) {
        const newMarker = task.outputValue[task.outputValue.length - 1];
        setMarker(newMarker);
      } else {
        setMarker(null);
      }
    }
  }, [task]);

  if (task.task_id.output === "text") {
    field = (
      <Grid item xs={12}>
        <MDBox mb={2} p={2}>
          <MDInput
            type="text"
            label={task.task_id.name}
            name="task-value"
            variant="standard"
            value={TaskValue}
            onChange={(e) => {
              setTaskValue(e.target.value);
            }}
            fullWidth
          />
        </MDBox>
      </Grid>
    );
  } else if (task.task_id.output === "bool") {
    field = (
      <MDBox mb={2} p={2}>
        <MDTypography
          variant="button"
          fontWeight="regular"
          color="text"
          sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
        >
          &nbsp;&nbsp;{task.task_id.name}
        </MDTypography>
        <Switch checked={bool} onChange={() => setBool(!bool)} />
      </MDBox>
    );
  } else if (task.task_id.output === "map") {
    field = (
      <MDBox mb={2} p={2}>
        <MDTypography
          variant="button"
          fontWeight="regular"
          color="text"
          sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
        >
          &nbsp;&nbsp;{task.task_id.name}
        </MDTypography>
        {marker ? (
          <Map
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credentials.GOOGLE_API_KEY}`}
            containerElement={<div style={{ height: "400px" }} />}
            mapElement={<div style={{ height: "100%" }} />}
            loadingElement={<p>Cargando..</p>}
            marker={marker}
          />
        ) : (
          <MDButton variant="gradient" color="warning" fullWidth>
            CARGAR MAPA
          </MDButton>
        )}
      </MDBox>
    );
  } else if (task.task_id.output === "img") {
    field = (
      <MDBox mb={2} p={2}>
        <MDTypography
          variant="button"
          fontWeight="regular"
          color="text"
          sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
        >
          &nbsp;&nbsp;{task.task_id.name}
        </MDTypography>
        {TaskValue ? (
          <CardMedia
            src={TaskValue}
            component="img"
            title=""
            sx={{
              maxWidth: "50%",
              margin: 0,
              boxShadow: ({ boxShadows: { md } }) => md,
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        ) : (
          <MDButton variant="gradient" color="warning" fullWidth>
            SUBIR IMAGEN
          </MDButton>
        )}
      </MDBox>
    );
  }
  return field;
}

export default Task;