import React from "react";
import { useState, useEffect } from "react";

function CreateFood() {
  const [name, setName] = useState<String>("");
  const [calories, setCalories] = useState<number>(0);
  const [protein, setProtein] = useState<number>(0);
  const [carbs, serCarbs] = useState<number>(0);
  const [fat, setFat] = useState<number>(0);
  const [servingSize, setServingSize] = useState<number>(0);
  const [ServingUnit, setServingUnit] = useState<String>("");

  const createCustomFood = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/api/foods/custom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        calories,
        protein,
        carbs,
        fat,
        servingSize,
        ServingUnit,
      }),
    });

    const result = await response.json();
    console.log("HTTP Response Status:", response.status, response.statusText);
    console.log("HTTP Response Data", result);
  };

  return <div></div>;
}

export default CreateFood;
