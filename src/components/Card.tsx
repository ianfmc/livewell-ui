import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

type CardProps = {
  title: string;
  subtitle: string;
};

const ContractCard = ({ title, subtitle }: CardProps) => (
  <Card elevation={3} sx={{ minWidth: 275, borderRadius: 3 }}>
    <CardContent>
      <Typography gutterBottom variant="h6" component="div">
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {subtitle}
      </Typography>
    </CardContent>

    <CardActions sx={{ px: 2, pb: 2 }}>
      <Button size="small" variant="contained">
        Info
      </Button>
    </CardActions>
  </Card>
);

export default ContractCard;