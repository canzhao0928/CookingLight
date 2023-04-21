import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./RecipeGallery.css";

const RecipeGallery = ({ id, img, name }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <a className="recipeGallery_link" href={`/recipe/${id}`}>
        <CardMedia sx={{ height: 140 }} image={img} title="food" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
      </a>
    </Card>
  );
};

export default RecipeGallery;
