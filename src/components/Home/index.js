import { useEffect, useState } from "react";
import { RecipeDB_API_KEY, RecipeDB_API_URL } from "../RecipeDB";
import RecipeGallery from "../RecipeGallery";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./Home.css";
const Home = () => {
  const [newRecipe, setNewRecipe] = useState([]);
  const [popularRecipe, setPopularRecipe] = useState([]);
  useEffect(() => {
    //newRecipe from 0-5, popularRecipe from 6-11
    const url = `https://${RecipeDB_API_URL}/recipes/list?from=0&size=12&tags=under_30_minutes`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RecipeDB_API_KEY,
        "X-RapidAPI-Host": RecipeDB_API_URL,
      },
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        setNewRecipe(response.results.slice(0, 6));
        setPopularRecipe(response.results.slice(6));
        // //mock test
        // setNewRecipe(response.results);
        // setPopularRecipe(response.results);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <div className="container">
        <h2 className="heading_secondary">New recipes</h2>
        <div className="grid-col-3">
          {newRecipe.length === 0 ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            newRecipe.map((recipe) => {
              return (
                <RecipeGallery
                  key={recipe.id}
                  id={recipe.id}
                  img={recipe.thumbnail_url}
                  name={recipe.name}
                />
              );
            })
          )}
        </div>
      </div>

      <div className="container">
        <h2 className="heading_secondary">Popular recently</h2>
        <div className="grid-col-3">
          {popularRecipe.length === 0 ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            popularRecipe.map((recipe) => {
              return (
                <RecipeGallery
                  key={recipe.id}
                  id={recipe.id}
                  img={recipe.thumbnail_url}
                  name={recipe.name}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
