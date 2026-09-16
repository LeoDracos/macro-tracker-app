import { Typography } from "@mui/material";
import React from "react";

/* COLOURS */
const PRIMARY_COLOUR = "#1f2b48";
const GREY_COLOUR = "#6d7993";
const BLUE_COLOUR = "#253a6e";
const PINK_COLOUR = "#fa6a60";

function Header() {
  return (
    <div>
      <Typography variant="h5" component="header">
        Macro Tracker
      </Typography>
    </div>
  );
}

export default Header;
