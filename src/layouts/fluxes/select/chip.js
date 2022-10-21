import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Icon, SvgIcon } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import 'components/MDSelect/select.css'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
/*
const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];
*/
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({ label, rows, submitLabel, onSubmit, disabledSubmit, name }) {
  const theme = useTheme();
  const [value, setValue] = useState([]);
  rows = Array.isArray(rows) ? rows : [];

  const handleChange = (event) => {
    const {
      target: { value: val },
    } = event;
    setValue(typeof val === "string" ? val.split(",") : val);
  };

  const onSave = () => {
    onSubmit(value.map((val) => rows.find((r) => r.name === val)));
    setValue([])
  };

  return (
    <div>
      <FormControl fullWidth name={name}>
        <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          displayEmpty
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((val) => (
                <Chip key={val} label={val} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {rows.map((d) => (
            <MenuItem key={d.id} value={`${d.name}`} style={getStyles(d.name, value, theme)}>
              {d.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <MDBox pt={3} pb={3} px={3}>
        <MDButton variant="gradient" color="primary" fullWidth onClick={onSave} disabled={disabledSubmit}>
          {submitLabel}
        </MDButton>
      </MDBox>
    </div>
  );
}
