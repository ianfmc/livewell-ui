import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type CardProps = {
  instrument: string;
  strike: string;
  expiry: string;
  status: string;
};

const ContractCard = ({ instrument, strike, expiry, status }: CardProps) => (
  <Card elevation={3} sx={{ borderRadius: 3 }}>
    <CardContent>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h6">{instrument}</Typography>
        <Chip label={status} size="small" />
      </Stack>

      <Stack spacing={0.25}>
        <Typography variant="body1">Strike: {strike}</Typography>

        <Typography variant="body2" color="text.secondary">
          Expires: {expiry}
        </Typography>
      </Stack>
    </CardContent>

    <CardActions sx={{ px: 2, pb: 2 }}>
      <Button size="small" variant="contained">
        Info
      </Button>
    </CardActions>
  </Card>
);

export default ContractCard;
