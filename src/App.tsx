import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import ContractCard from "./components/Card";
import { mockData } from "./data/mockData";

const App = () => {
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredData =
    statusFilter === "All"
      ? mockData
      : mockData.filter((card) => card.status === statusFilter);

  return (  
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

        <Box sx={{ mb: 3, maxWidth: 220 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              value={statusFilter}
              label="Status"
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="Review">Review</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Visible Contracts: {filteredData.length} | Review Needed:{" "}
          {filteredData.filter((card) => card.status === "Review").length}
        </Typography>

        <Grid container spacing={3}>
          {filteredData.map((card) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={card.instrument + card.strike}>
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
};

export default App;
