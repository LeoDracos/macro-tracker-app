import {
  Box,
  CircularProgress,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState, useEffect } from "react";
import React from "react";
import MacroRing from "../components/MacroRing";
import { User } from "../classes/User";

interface Food {
  id?: number;
  externalApiId?: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface DashboardPageProps {
  user: User | null;
}

function DashboardPage({ user }: DashboardPageProps) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [food, setFood] = useState<Food | null>(null);
  const [servingSize, setServingSize] = useState<number>(1);
  const [searchType, setSearchType] = useState<String>("name");

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    var lowerCase = e.target.value.toLowerCase();
    setSearch(lowerCase);
  };

  const keyPress = async (e: React.FormEvent) => {
    e.preventDefault();

    if (search.trim() === "") return;

    setLoading(true);
    setError(null);

    let data;

    if (searchType === "barcode") {
      const barcodeResponse = await fetch(
        `http://localhost:8080/api/foods/barcode/${search}`,
      );
      console.log(
        "3. HTTP Response Status:",
        barcodeResponse.status,
        barcodeResponse.statusText,
      );
      data = await barcodeResponse.json();
    } else {
      const nameResponse = await fetch(
        `http://localhost:8080/api/foods/name/${search}`,
      );
      console.log(
        "3. HTTP Response Status:",
        nameResponse.status,
        nameResponse.statusText,
      );
      data = await nameResponse.json();
    }

    console.log("4. HTTP Response Data:", data);
    const food: Food = {
      externalApiId: data.externalApiId,
      name: data.name,
      calories: data.calories,
      protein: data.protein,
      carbs: data.carbs,
      fat: data.fat,
    };

    setFood(food);
  };

  const servingSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    var serving = Number(e.target.value);
    setServingSize(serving / 100);
  };

  const handleSearchTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newSearchType: string | null,
  ) => {
    if (newSearchType !== null) {
      setSearchType(newSearchType);
    }
    console.log("Search type changed to:", newSearchType);
  };

  return (
    <Box sx={{}}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
          mt: 5,
          mb: 8,
        }}
      >
        <Stack direction="row" spacing={10}>
          <MacroRing
            label="Calories"
            current={61}
            target={278}
            colour="#cb9338"
            unit="g"
          />
          <MacroRing
            label="Carbohydrates"
            current={61}
            target={278}
            colour="#c35ea6"
            unit="g"
          />
          <MacroRing
            label="Protein"
            current={61}
            target={278}
            colour="blue"
            unit="g"
          />
          <MacroRing
            label="Fats"
            current={61}
            target={278}
            colour="#459b73"
            unit="g"
          />
        </Stack>
      </Box>
      Name:{food?.name || " "} Calories:
      {(food?.calories as number) * servingSize || "0"} Protein:
      {(food?.protein as number) * servingSize || "0"} Carbs:
      {(food?.carbs as number) * servingSize || "0"} Fat:
      {(food?.fat as number) * servingSize || "0"}
      <ToggleButtonGroup
        value={searchType}
        exclusive
        onChange={handleSearchTypeChange}
      >
        <ToggleButton value="name">Name</ToggleButton>
        <ToggleButton value="barcode">Barcode</ToggleButton>
      </ToggleButtonGroup>
      <form
        onSubmit={keyPress}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px",
        }}
      >
        <TextField
          id="outlined-basic"
          onChange={inputChange}
          variant="outlined"
          label="Search"
        />
      </form>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px",
        }}
      >
        <TextField
          onChange={servingSizeChange}
          id="outlined-basic"
          variant="outlined"
          label="Number of grams or ml"
          type="number"
        />
      </form>
    </Box>
  );
}

export default DashboardPage;
