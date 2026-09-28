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
  // Daily Totals
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [totalProtein, setTotalProtein] = useState<number>(0);
  const [totalCarbs, setTotalCarbs] = useState<number>(0);
  const [totalFats, setTotalFats] = useState<number>(0);
  // Breakfast Totals
  const [breakfastCalories, setBreakfastCalories] = useState<number>(0);
  const [breakfastProtein, setBreakfastProtein] = useState<number>(0);
  const [breakfastCarbs, setBreakfastCarbs] = useState<number>(0);
  const [breakfastFats, setBreakfastFats] = useState<number>(0);
  // Lunch Totals
  const [lunchCalories, setLunchCalories] = useState<number>(0);
  const [lunchProtein, setLunchProtein] = useState<number>(0);
  const [lunchCarbs, setLunchCarbs] = useState<number>(0);
  const [lunchFats, setLunchFats] = useState<number>(0);
  // Dinner Totals
  const [dinnerCalories, setDinnerCalories] = useState<number>(0);
  const [dinnerProtein, setDinnerProtein] = useState<number>(0);
  const [dinnerCarbs, setDinnerCarbs] = useState<number>(0);
  const [dinnerFats, setDinnerFats] = useState<number>(0);
  // Snacks Totals
  const [snacksCalories, setSnacksCalories] = useState<number>(0);
  const [snacksProtein, setSnacksProtein] = useState<number>(0);
  const [snacksCarbs, setSnacksCarbs] = useState<number>(0);
  const [snacksFats, setSnacksFats] = useState<number>(0);

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
    getDailySummary();
    getMealSummarys();
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

  const getMealSummarys = async () => {
    const today = new Date();
    const dateString = today.toISOString().split("T")[0];
    const response = await fetch(
      `http://localhost:8080/api/logs/mealSummaries?userId=${user.userId}&date=${dateString}`,
    );
    console.log(
      "3. HTTP Response Status:",
      response.status,
      response.statusText,
    );
    const result = await response.json();
    console.log("4. HTTP Response Data:", result);

    setBreakfastCalories(result.breakfastCalories);
    setBreakfastProtein(result.breakfastProtein);
    setBreakfastCarbs(result.breakfastCarbs);
    setBreakfastFats(result.breakfastFat);

    setLunchCalories(result.lunchCalories);
    setLunchProtein(result.lunchProtein);
    setLunchCarbs(result.lunchCarbs);
    setLunchFats(result.lunchFat);

    setDinnerCalories(result.dinnerCalories);
    setDinnerProtein(result.dinnerProtein);
    setDinnerCarbs(result.dinnerCarbs);
    setDinnerFats(result.dinnerFat);

    setSnacksCalories(result.snacksCalories);
    setSnacksProtein(result.snacksProtein);
    setSnacksCarbs(result.snacksCarbs);
    setSnacksFats(result.snacksFat);
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
    getMealSummarys();
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
            calories={breakfastCalories}
            protein={breakfastProtein}
            carbs={breakfastCarbs}
            fats={breakfastFats}
          />
          <MealMacroBar
            mealType="Lunch"
            calories={lunchCalories}
            protein={lunchProtein}
            carbs={lunchCarbs}
            fats={lunchFats}
          />
          <MealMacroBar
            mealType="Dinner"
            calories={dinnerCalories}
            protein={dinnerProtein}
            carbs={dinnerCarbs}
            fats={dinnerFats}
          />
          <MealMacroBar
            mealType="Snack"
            calories={snacksCalories}
            protein={snacksProtein}
            carbs={snacksCarbs}
            fats={snacksFats}
          />
        </Stack>
        <Button onClick={keyPress}>test!</Button>
        <TextField onChange={inputChange} />
      </Box>
    </Box>
  );
}

export default DashboardPage;
