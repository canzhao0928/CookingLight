import RecipeList from "../RecipeList";
import { useEffect, useState } from "react";
import "./Saved.css";
const Saved = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("savedRecipes"))
      localStorage.setItem("savedRecipes", JSON.stringify([]));
    setSavedRecipes(JSON.parse(localStorage.getItem("savedRecipes")));
  }, []);
  return (
    <>
      {savedRecipes.length === 0 ? (
        <h2>
          You haven't saved any recipes yet. Go take a look at the recipes to
          see if there are any you like.
        </h2>
      ) : (
        <div className="container_saved">
          {savedRecipes.map((recipe) => {
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

export default Saved;
