import "./RecipeList.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const RecipeList = ({ id, img, name, description }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <a className="recipeGallery_link" href={`/recipe/${id}`}>
        <CardMedia sx={{ height: 140 }} image={img} title="food" />
      </a>
      <CardContent>
        <a className="recipeGallery_link" href={`/recipe/${id}`}>
          <Typography gutterBottom variant="h4" component="div">
            {name}
          </Typography>
        </a>
        <Typography gutterBottom variant="h6" component="div">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecipeList;
