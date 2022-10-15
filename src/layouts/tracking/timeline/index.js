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
import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import io from "socket.io-client";
import { useLocalStorage } from "providers/useLocalStorage";
import TimelineItem from "./TimelineItem";
import TimeLineItemContent from "./TimeLineItemContent";

function TimeLine({ modules }) {
  const [selectedModule, setSelectedModule] = useState(null);

  useEffect(() => {
    for (let i = 0; i < modules.length; i++) {
      const modulo = modules[i];
      if (modulo.status === "WAITING") {
        setSelectedModule(modulo);
        return;
      }
    }
    for (let i = modules.length - 1; i >= 0; i--) {
      const modulo = modules[i];
      if (modulo.status === "SUCCESS") {
        setSelectedModule(modulo);
        return;
      }
    }
    setSelectedModule(modules[0]);
  }, [modules]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Card sx={{ height: "100%" }}>
          <MDBox p={2}>
            {modules.map((m) => (
              <TimelineItem
                color="info"
                icon={m.module_id.icon}
                title={m.module_id.name}
                started_at={m.started_at}
                ended_at={m.ended_at}
                status={m.status}
                key={m.id}
              />
            ))}
          </MDBox>
        </Card>
      </Grid>
      <Grid item xs={9}>
        {selectedModule ? (
          <TimeLineItemContent modulo={selectedModule} />
        ) : (
          <span>LOADING.....</span>
        )}
      </Grid>
    </Grid>
  );
}

export default TimeLine;

/*
        <TimelineItem
          color="success"
          icon="notifications"
          title="$2400, Design changes"
          dateTime="22 DEC 7:20 PM"
        />
        <TimelineItem
          color="error"
          icon="inventory_2"
          title="New order #1832412"
          dateTime="21 DEC 11 PM"
        />
        <TimelineItem
          color="info"
          icon="shopping_cart"
          title="Server payments for April"
          dateTime="21 DEC 9:34 PM"
        />
        <TimelineItem
          color="warning"
          icon="payment"
          title="New card added for order #4395133"
          dateTime="20 DEC 2:20 AM"
        />
        <TimelineItem
          color="primary"
          icon="vpn_key"
          title="New card added for order #4395133"
          dateTime="18 DEC 4:54 AM"
          lastItem
        /> */
