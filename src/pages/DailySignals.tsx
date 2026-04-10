import { useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import ContractCard from '../components/contract-card';
import { mockData } from '../data/mockData';

const DailySignals = () => {
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredData = statusFilter === 'All' ? mockData : mockData.filter(item => item.status === statusFilter);

  return(
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Daily Signals
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Review scored opportunities, filter by status, and inspect contracts
        </Typography>

      <Box sx={{ mb: 3, maxWidth: 222 }}>
        <FormControl fullWidth size="small"> 
          <InputLabel id="status-filter-label">Status</InputLabel> 
          <Select
            labelId="status-filter-label"
            id="status-filter"
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="Review">Review</MenuItem>
            <MenuItem value="Closed">Closed</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Visible Contracts: {filteredData.length} | Review Needed: {" "}
        {filteredData.filter(item => item.status === 'Review').length}
      </Typography>

      <Grid container spacing={3}>
        {filteredData.map((card) => (
          <Grid size={{ xs:12, sm:6, md: 4}} key={card.instrument + card.strike}>
            <ContractCard 
            instrument={card.instrument} 
            strike={card.strike}
            expiry={card.expiry}
            status={card.status}
          />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default DailySignals;  