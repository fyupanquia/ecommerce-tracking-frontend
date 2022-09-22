import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "module", headerName: "Módulo", width: 130 },
  {
    field: "actions",
    headerName: "Acciones",
  },
];

const rows = [
  { id: 1, module: "Snow", actions: "Jon" },
  { id: 2, module: "Lannister", actions: "Cersei" },
  { id: 3, module: "Lannister", actions: "Jaime" },
  { id: 4, module: "Stark", actions: "Arya" },
  { id: 5, module: "Targaryen", actions: "Daenerys" },
  { id: 6, module: "Melisandre", actions: null  },
  { id: 7, module: "Clifford", actions: "Ferrara" },
  { id: 8, module: "Frances", actions: "Rossini" },
  { id: 9, module: "Roxie", actions: "Harvey" },
];

export default function ModuleTable() {
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}
