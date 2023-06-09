import {Button, Card, CardActions, CardContent, CardMedia, Icon, Typography} from '@mui/material';
import IconButton from "@mui/material/IconButton";

function ProductCard({ productData }) {
    const { images, category_name, name, description} = productData;

  return (
    <Card
        className="shadow-lg border-1 rounded-0"
    >
      <CardMedia
        sx={{ height: 200 }}
        style={{ width: "100%", backgroundSize: "contain" }}
        image={images[0]}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
            {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton size="small" color="error">
          <Icon> delete </Icon>
        </IconButton>
          <Button>View</Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
