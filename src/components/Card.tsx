import { useState } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type CardProps = {
  instrument: string;
  strike: string;
  expiry: string;
  status: string;
};

const ContractCard = ({ instrument, strike, expiry, status }: CardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Typography variant="h5">{instrument}</Typography>
            <Chip label={status} size="small" />
          </Stack>

          <Stack spacing={0.5} alignItems="flex-end"> 
            <Typography variant="body1">
              Strike: {strike}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Expires: {expiry}
            </Typography>
          </Stack>
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button size="small" variant="contained" onClick={() => setOpen(true)}>
            Info
          </Button>
        </CardActions>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{instrument}</DialogTitle>

        <DialogContent>
          <Typography>Strike: {strike}</Typography>
          <Typography>Expiry: {expiry}</Typography>
          <Typography>Status: {status}</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ContractCard;