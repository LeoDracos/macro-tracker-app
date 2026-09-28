import { Box, Stack, Typography, Button, ButtonBase } from "@mui/material";
import { useState, useEffect } from "react";
import React from "react";

interface MealMacroBarProps {
  mealType: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const MealMacroBar = ({
  mealType,
  calories,
  protein,
  carbs,
  fats,
}: MealMacroBarProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "#50638c",
        borderRadius: "10px",
        height: "32px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Typography
          sx={{
            ml: 2,
            fontWeight: 600,
            fontSize: "1.1rem",
            textAlign: "start",
          }}
        >
          {mealType}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            my: 0.4,
            mr: 0.4,
          }}
        >
          <ButtonBase
            sx={{
              cursor: "pointer",
              height: "25px",
              width: "150px",
              mr: 1,
              borderRadius: "8px",
              background: "#3a4b74",
              "&:hover": {
                backgroundColor: "#f0f0f4", // Light gray background on hover
                fontWeight: "bold", // Makes text slightly thicker on hover (optional)
              },
            }}
          >
            <Typography
              sx={{
                width: "120px",
                fontWeight: 600,
                fontSize: "1.1rem",
                textAlign: "center",
              }}
            >
              View Log
            </Typography>
          </ButtonBase>
          <ButtonBase
            sx={{
              cursor: "pointer",
              height: "25px",
              width: "150px",
              borderRadius: "8px",
              background: "#3a4b74",
              "&:hover": {
                backgroundColor: "#f0f0f4", // Light gray background on hover
                fontWeight: "bold", // Makes text slightly thicker on hover (optional)
              },
            }}
          >
            <Typography
              sx={{
                width: "120px",
                fontWeight: 600,
                fontSize: "1.1rem",
                textAlign: "center",
              }}
            >
              Edit Log
            </Typography>
          </ButtonBase>
        </Box>
      </Box>
      <Stack direction={"row"} spacing={11} sx={{ ml: 2, mt: 0.5 }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "1.1rem",
            textAlign: "start",
            width: "250px",
          }}
        >
          Calories: {calories}kcal
        </Typography>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "1.1rem",
            textAlign: "start",
            width: "220px",
          }}
        >
          Protein: {protein}g
        </Typography>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "1.1rem",
            textAlign: "start",
            width: "250px",
          }}
        >
          Carbohydrates: {carbs}g
        </Typography>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "1.1rem",
            textAlign: "start",
            width: "250px",
          }}
        >
          Fats: {fats}g
        </Typography>
      </Stack>
    </Box>
  );
};

export default MealMacroBar;
