import RecipeList from "../RecipeList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecipeDB_API_KEY } from "../RecipeDB";
import Search from "../Search";
import { TopSearchs } from "../RecipeDB";
import "./RecipesLibrary.css";

const RecipesLibrary = () => {
  const [recipes, setRecipes] = useState([]);
  let params = useParams();
  useEffect(() => {
    const url = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes&q=${params.query}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RecipeDB_API_KEY,
        "X-RapidAPI-Host": "tasty.p.rapidapi.com",
      },
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        return setRecipes(response.results);
      })
      .catch((err) => console.error(err));
  }, [params.query]);
  return (
    <>
      <Search />
      {recipes.length === 0 ? (
        <>
          <h2>
            Dear, you don't seem to have entered the keywords you need to search
            for...
          </h2>
          <h2>To see what people are searching for:</h2>

          <ul>
            {TopSearchs.map((search, index) => {
              return (
                <li key={index}>
                  <span>{index + 1}</span>
                  <p>search</p>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <div className="container_library">
          {recipes.map((recipe) => {
            return (
              <RecipeList
                key={recipe.id}
                id={recipe.id}
                img={recipe.thumbnail_url}
                name={recipe.name}
                description={recipe.description}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default RecipesLibrary;
