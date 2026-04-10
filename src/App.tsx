import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#FFFFFF" }}>
            LIVEWELL
          </Typography>

          <Button
            variant="contained"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            Toggle Theme ({theme})
          </Button>
        </Toolbar>
      </AppBar>

      <DailySignals />
    </Box>
  </>
);
};

export default App;
