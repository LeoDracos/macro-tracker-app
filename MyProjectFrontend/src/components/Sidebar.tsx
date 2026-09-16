import { Box, Typography, ButtonBase } from "@mui/material";
import React from "react";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface Props {
  setCurrentPage: (page: string) => void;
  isLoggedIn: boolean;
}

function Sidebar({ setCurrentPage, isLoggedIn }: Props) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        <FitnessCenterIcon sx={{ fontSize: 50, color: "white" }} />
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <ButtonBase
          disabled={!isLoggedIn}
          onClick={() => setCurrentPage("dashboard")}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            py: 1,
            px: 2,
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#f0f0f4", // Light gray background on hover
              fontWeight: "bold", // Makes text slightly thicker on hover (optional)
            },
          }}
        >
          <DashboardIcon sx={{ fontweight: "inherit", color: "white" }} />
          <Typography
            variant="body1"
            sx={{
              fontWeight: "inherit",
              color: "white",
            }}
          >
            Dashboard
          </Typography>
        </ButtonBase>

        <ButtonBase
          disabled={!isLoggedIn}
          onClick={() => setCurrentPage("profile")}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            py: 1,
            px: 2,
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#f0f0f4", // Light gray background on hover
              fontWeight: "bold", // Makes text slightly thicker on hover (optional)
            },
          }}
        >
          <AccountCircleIcon sx={{ color: "white" }} />
          <Typography
            variant="body1"
            sx={{
              fontWeight: "inherit",
              color: "white",
            }}
          >
            Profile
          </Typography>
        </ButtonBase>

        <ButtonBase
          disabled={!isLoggedIn}
          onClick={() => setCurrentPage("createFood")}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            py: 1,
            px: 2,
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#f0f0f4", // Light gray background on hover
              fontWeight: "bold", // Makes text slightly thicker on hover (optional)
            },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: "inherit",
              color: "white",
            }}
          >
            Create Food
          </Typography>
        </ButtonBase>
      </Box>
    </div>
  );
}

export default Sidebar;
