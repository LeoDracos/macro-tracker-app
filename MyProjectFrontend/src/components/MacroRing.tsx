import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface MacroRingProps {
  label: string; // e.g. "Carbohydrates"
  current: number; // e.g. 61
  target: number; // e.g. 278
  colour: string; // e.g. "#14b8a6" (Teal/Turquoise)
  unit?: string; // e.g. "g"
}

const MacroRing = ({
  label,
  current,
  target,
  colour,
  unit,
}: MacroRingProps) => {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        variant="body1"
        component="div"
        sx={{
          mb: 1,
          fontFamily:
            '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontWeight: 600,
          fontSize: "1.1rem",
          color: colour,
          letterSpacing: "-0.01em",
        }}
      >
        {label}
      </Typography>
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={150}
          thickness={4}
          sx={{ color: "#E5E7EB" }}
        />
        <CircularProgress
          variant="determinate"
          value={percentage}
          size={150}
          thickness={4.1}
          sx={{
            color: colour,
            position: "absolute",
            strokeLinecap: "round",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: 700, color: "#111827" }}
          >
            {current}
            {unit}
          </Typography>
          <Typography
            variant="body2"
            component="div"
            sx={{ fontWeight: 500, color: "#111827" }}
          >
            /{target}
            {unit}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
          mt: 1,
        }}
      >
        <Typography
          variant="body2"
          component="div"
          sx={{
            fontFamily:
              '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: 500,
            fontSize: "0.875rem",
            color: "#111827",
            letterSpacing: "-0.01em",
          }}
        >
          {target - current} {unit} left
        </Typography>
      </Box>
    </Box>
  );
};

export default MacroRing;
