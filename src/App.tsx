import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import DailySignals from "./pages/DailySignals";
import { useTheme } from "./components/theme-provider";

const App = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <CssBaseline />

      <Box
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          bgcolor: theme === "light" ? "grey.100" : "grey.900",
          color: theme === "light" ? "text.primary" : "#fff",
        }}
      >
        <AppBar
          position="static"
          color="transparent"
          sx={{
            bgcolor: theme === "light" ? "primary.main" : "grey.950",
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ color: "#FFFFFF", mr: 2 }}>
              LIVEWELL
            </Typography>

            <Button component={Link} to="/" sx={{ color: "#FFFFFF" }}>
              Dashboard
            </Button>
            <Button component={Link} to="/signals" sx={{ color: "#FFFFFF" }}>
              Daily Signals
            </Button>

            <Box sx={{ flexGrow: 1 }} />

            <Button
              variant="contained"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              Toggle Theme ({theme})
            </Button>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signals" element={<DailySignals />} />
        </Routes>
      </Box>
    </>
  );
};

export default App;
