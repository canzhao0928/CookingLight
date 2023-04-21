import RecipeList from "../RecipeList";
import "./Saved.css";
const Saved = () => {
  const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes") || []);
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
