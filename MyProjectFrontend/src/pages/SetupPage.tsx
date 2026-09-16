import { Box, Button } from "@mui/material";
import React from "react";

interface SetupPageProps {
  setCurrentPage: (page: string) => void;
}

function SetupPage({ setCurrentPage }: SetupPageProps) {
  function handleLogin(): void {
    console.log("Login button clicked");
  }

  function handleRegister(): void {
    console.log("Register button clicked");
  }

  return (
    <div>
      <Box
        sx={{
          position: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "600px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => setCurrentPage("login")}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ mt: 3 }}
          onClick={() => setCurrentPage("register")}
        >
          Register
        </Button>
      </Box>
    </div>
  );
}

export default SetupPage;
