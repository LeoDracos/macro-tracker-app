import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function Item({ children }: { children: React.ReactNode }) {
  return (
    <Paper sx={{ p: 2, textAlign: "center" }} elevation={1}>
      {children}
    </Paper>
  );
}

function GridComponent() {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 6, md: 8 }}>
        <Item>xs=6 md=8</Item>
      </Grid>
      <Grid size={{ xs: 6, md: 4 }}>
        <Item>xs=6 md=4</Item>
      </Grid>
      <Grid size={{ xs: 6, md: 4 }}>
        <Item>xs=6 md=4</Item>
      </Grid>
      <Grid size={{ xs: 6, md: 8 }}>
        <Item>xs=6 md=8</Item>
      </Grid>
    </Grid>
  );
}

export default GridComponent;
