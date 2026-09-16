import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { User } from "../classes/User";

interface RegisterPageProps {
  setCurrentPage: (page: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: User) => void;
}

function RegisterPage({
  setCurrentPage,
  setIsLoggedIn,
  setUser,
}: RegisterPageProps) {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [targetCalories, setTargetCalories] = React.useState<number | null>(
    null,
  );
  const [targetProtein, setTargetProtein] = React.useState<number | null>(null);
  const [targetCarbs, setTargetCarbs] = React.useState<number | null>(null);
  const [targetFat, setTargetFat] = React.useState<number | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        targetCalories,
        targetProtein,
        targetCarbs,
        targetFat,
      }),
    });

    const result = await response.json();
    console.log("HTTP Response Status:", response.status, response.statusText);
    console.log("HTTP Response Data", result);
    if (response.ok) {
      setIsLoggedIn(true);
      setCurrentPage("dashboard");
      setUser(new User().fromJSON(result));
    } else {
      alert("Registration failed. Try a different username.");
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
      <Box>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Register
        </Typography>
      </Box>

      <form onSubmit={handleRegister}>
        <Box //username email password
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            height: "200px",
            mx: "auto",
            justifyContent: "center",
            gap: 2,
            position: "static",
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            type="text"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            required
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </Box>

        <Box>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Enter your daily macros
          </Typography>
        </Box>

        <Box //macros
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            height: "100px",
            mx: "auto",
            justifyContent: "center",
            gap: 2,
            position: "static",
          }}
        >
          <TextField
            label="Calories"
            variant="outlined"
            margin="normal"
            type="number"
            required
            onChange={(e) => setTargetCalories(Number(e.target.value))}
          />
          <TextField
            label="Protein"
            variant="outlined"
            margin="normal"
            type="number"
            required
            onChange={(e) => setTargetProtein(Number(e.target.value))}
          />
          <TextField
            label="Carbohydrates"
            variant="outlined"
            margin="normal"
            type="number"
            required
            onChange={(e) => setTargetCarbs(Number(e.target.value))}
          />
          <TextField
            label="Fat"
            variant="outlined"
            margin="normal"
            type="number"
            required
            onChange={(e) => setTargetFat(Number(e.target.value))}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            width: "300px",
            alignItems: "center",
            mx: "auto",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default RegisterPage;
