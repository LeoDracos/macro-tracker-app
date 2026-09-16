import { useState, useEffect } from "react";
import "./App.css";
import { Grid, Box, Paper, Typography } from "@mui/material";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import CreateFoodPage from "./pages/CreateFoodPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Create } from "@mui/icons-material";
import SetupPage from "./pages/SetupPage";
import { User } from "./classes/User";

/* COLOURS */
const PRIMARY_COLOUR = "#252a34";
const GREY_COLOUR = "#606d85";
const BLUE_COLOUR = "#253a6e";
const PINK_COLOUR = "#fa6a60";

function App() {
  const [currentPage, setCurrentPage] = useState("setup");
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const calories = 2000;
  const protein = 150;
  const carbs = 250;
  const fat = 70;

  const loadPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />;
      case "profile":
        return <ProfilePage />;
      case "createFood":
        return <CreateFoodPage />;
      case "setup":
        return <SetupPage setCurrentPage={setCurrentPage} />;
      case "login":
        return (
          <LoginPage
            setCurrentPage={setCurrentPage}
            setIsLoggedIn={setIsLoggedIn}
            setUser={setUser}
          />
        );
      case "register":
        return (
          <RegisterPage
            setCurrentPage={setCurrentPage}
            setIsLoggedIn={setIsLoggedIn}
            setUser={setUser}
          />
        );
      default:
        return <Typography>PAGE NOT FOUND</Typography>;
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: PRIMARY_COLOUR,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Box>
        <Paper
          sx={{
            p: 3,
            textAlign: "center",
            backgroundColor: "#323948",
            color: "#fff",
            borderRadius: "15px",
            border: "8px",
            borderColor: "#323948",
            mx: 1,
            mt: 0.5,
          }}
          elevation={0}
        >
          <Header />
        </Paper>
      </Box>

      <Box sx={{ flexGrow: 1, p: 1, minHeight: 0 }}>
        <Grid container spacing={1} sx={{ height: "100%" }}>
          {/* SideBar */}
          <Grid size={{ xs: 12, md: 2 }} sx={{ height: "100%" }}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                bgcolor: "#323948",
                height: "100%",
                boxSizing: "border-box",
                borderRadius: "15px",
                border: "8px",
                borderColor: "#323948",
              }}
            >
              <Sidebar
                setCurrentPage={setCurrentPage}
                isLoggedIn={isLoggedIn}
              />
            </Paper>
          </Grid>

          {/* Main Content */}
          <Grid size={{ xs: 12, md: 10 }} sx={{ height: "100%" }}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                bgcolor: GREY_COLOUR,
                height: "100%", // Tells Paper to take up 100% of the Grid height
                boxSizing: "border-box",
                borderRadius: "15px",
                border: "8px",
                borderColor: GREY_COLOUR,
              }}
            >
              {loadPage()}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
