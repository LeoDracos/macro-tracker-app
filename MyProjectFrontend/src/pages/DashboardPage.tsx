import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import React from "react";
import MacroRing from "../components/MacroRing";
import { User } from "../classes/User";
import MealMacroBar from "../components/MealMacroBar";

interface Food {
  id?: number;
  externalApiId?: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface DashboardPageProps {
  user: User;
}

function DashboardPage({ user }: DashboardPageProps) {
  const [search, setSearch] = useState("");
  const [food, setFood] = useState<Food | null>(null);
  const [servingSize, setServingSize] = useState<number>(1);
  const [searchType, setSearchType] = useState<String>("name");
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [totalProtein, setTotalProtein] = useState<number>(0);
  const [totalCarbs, setTotalCarbs] = useState<number>(0);
  const [totalFats, setTotalFats] = useState<number>(0);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    var lowerCase = e.target.value.toLowerCase();
    setSearch(lowerCase);
  };

  const keyPress = async (e: React.FormEvent) => {
    e.preventDefault();

    if (search.trim() === "") return;

    let data;
    setSearchType("name");

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
      fats: data.fat,
    };

    //confirm button
    const today = new Date();
    const dateString = today.toISOString().split("T")[0];
    const response = await fetch(`http://localhost:8080/api/logs/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.userId,
        date: dateString,
        mealType: "BREAKFAST",
        externalApiId: data.externalApiId,
        servings: servingSize,
      }),
    });

    setFood(food);
  };

  const getDailySummary = async () => {
    const today = new Date();
    const dateString = today.toISOString().split("T")[0];
    const response = await fetch(
      `http://localhost:8080/api/logs/summary?userId=${user.userId}&date=${dateString}`,
    );
    console.log(
      "3. HTTP Response Status:",
      response.status,
      response.statusText,
    );
    const result = await response.json();
    console.log("4. HTTP Response Data:", result);
    setTotalCalories(result.totalCalories);
    setTotalProtein(result.totalProtein);
    setTotalCarbs(result.totalCarbs);
    setTotalFats(result.totalFat);
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

  useEffect(() => {
    getDailySummary();
  }, [user?.userId]);

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
            current={totalCalories}
            target={user?.calories || 2000}
            colour="#cb9338"
            unit="kcal"
          />
          <MacroRing
            label="Carbohydrates"
            current={totalCarbs}
            target={user?.carbs || 300}
            colour="#c35ea6"
            unit="g"
          />
          <MacroRing
            label="Protein"
            current={totalProtein}
            target={user?.protein || 120}
            colour="blue"
            unit="g"
          />
          <MacroRing
            label="Fats"
            current={totalFats}
            target={user?.fat || 75}
            colour="#459b73"
            unit="g"
          />
        </Stack>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          mt: 15,
        }}
      >
        <Stack spacing={7}>
          <MealMacroBar
            mealType="Breakfast"
            calories={0}
            protein={0}
            carbs={0}
            fats={0}
          />
          <MealMacroBar
            mealType="Lunch"
            calories={0}
            protein={0}
            carbs={0}
            fats={0}
          />
          <MealMacroBar
            mealType="Dinner"
            calories={0}
            protein={0}
            carbs={0}
            fats={0}
          />
          <MealMacroBar
            mealType="Snack"
            calories={0}
            protein={0}
            carbs={0}
            fats={0}
          />
        </Stack>
        <Button onClick={keyPress}>test!</Button>
        <TextField onChange={inputChange} />
      </Box>
    </Box>
  );
}

export default DashboardPage;
