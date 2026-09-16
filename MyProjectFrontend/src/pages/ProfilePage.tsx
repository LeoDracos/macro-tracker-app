import { TextField } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";

interface UserData {
  id: String;
  username: String;
  password: String;
  email: String;
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
}

function ProfilePage() {
  const [userData, setUserData] = useState<UserData>();
  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [id, setId] = useState<String>("");
  const [targetCalories, setTargetCalories] = useState<number>(0);
  const [targetProtein, setTargetProtein] = useState<number>(0);
  const [targetCarbs, setTargetCarbs] = useState<number>(0);
  const [targetFat, setTargetFat] = useState<number>(0);

  const usernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const setCalories = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTargetCalories(Number(e.target.value));
  const setProtein = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTargetProtein(Number(e.target.value));
  const setCarbs = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTargetCarbs(Number(e.target.value));
  const setFat = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTargetFat(Number(e.target.value));
  const getId = (e: React.ChangeEvent<HTMLInputElement>) =>
    setId(e.target.value);

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
        targetCalories,
        targetProtein,
        targetCarbs,
        targetFat,
      }),
    });

    const result = await response.json();
    console.log("HTTP Response Status:", response.status, response.statusText);
    console.log("HTTP Response Data", result);

    const tempUserData: UserData = {
      id: result.id,
      username: username,
      password: password,
      email: email,
      targetCalories: targetCalories,
      targetCarbs: targetCarbs,
      targetFat: targetFat,
      targetProtein: targetProtein,
    };
    setUserData(tempUserData);
  };

  const findUserById = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8080/api/users/${id}`);
    console.log("HTTP Response Status:", response.status, response.statusText);

    const data = await response.json();
    console.log("HTTP Response Data", data);

    const tempUserData: UserData = {
      id: data.id,
      username: data.username,
      password: data.password,
      email: data.email,
      targetCalories: data.targetCalories,
      targetCarbs: data.targetCarbs,
      targetFat: data.targetFat,
      targetProtein: data.targetProtein,
    };
    setUserData(tempUserData);
  };

  const updateMacroGoals = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:8080/api/users/${id}/goals`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetCalories,
          targetProtein,
          targetCarbs,
          targetFat,
        }),
      },
    );
    console.log("HTTP Response Status:", response.status, response.statusText);

    const data = await response.json();
    console.log("HTTP Response Data", data);

    const tempUserData: UserData = {
      id: id,
      username: username,
      password: password,
      email: email,
      targetCalories: targetCalories,
      targetCarbs: targetCarbs,
      targetFat: targetFat,
      targetProtein: targetProtein,
    };
    setUserData(tempUserData);
  };

  return <div></div>;
}

export default ProfilePage;
