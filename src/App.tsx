import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import ContractCard from "./components/Card";
import { mockData } from "./data/mockData";

const App = () => (
  <>
    <CssBaseline />

    <Box sx={{ flexGrow: 1, minHeight: "100vh", bgcolor: "grey.100" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LIVEWELL
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Trading Dashboard
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Monitor contracts, review expirations, and evaluate opportunities.
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Active Contracts: {mockData.length} | Review Needed:{" "}
          {mockData.filter((card) => card.status === "Review").length}
        </Typography>

        <Grid container spacing={3}>
          {mockData.map((card) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={card.title}>
              <ContractCard
                key={card.instrument + card.strike}
                instrument={card.instrument}
                strike={card.strike}
                expiry={card.expiry}
                status={card.status}
              />{" "}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  </>
);

export default App;
