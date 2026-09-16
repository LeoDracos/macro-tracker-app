import React from "react";
import { TextField, Box, Typography, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { User } from "../classes/User";

interface LoginPageProps {
  setCurrentPage: (page: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: User) => void;
}

function LoginPage({ setCurrentPage, setIsLoggedIn, setUser }: LoginPageProps) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    console.log("HTTP Response Status:", response.status, response.statusText);
    console.log("HTTP Response Data", result);
    if (response.ok) {
      setIsLoggedIn(true);
      setCurrentPage("dashboard");
      setUser(new User().fromJSON(result));
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <Box sx={{ position: "relative", top: 0, left: 0, minheight: "100vh" }}>
      <Button
        startIcon={<ArrowBackIosNewIcon />}
        sx={{ position: "absolute", top: 0, left: 0, color: "#ffffff" }}
        onClick={() => setCurrentPage("setup")}
      >
        Back
      </Button>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          width: "300px",
          mx: "auto",
          pt: 15,
          position: "static",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Box sx={{ width: "300px" }}>
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;
