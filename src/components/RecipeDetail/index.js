import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { RecipeDB_API_KEY, SavedRecipes } from "../RecipeDB";
import {
  AiOutlineFieldTime,
  AiOutlineTeam,
  AiOutlineStar,
  AiFillStar,
  AiOutlineCheckSquare,
} from "react-icons/ai";
import "./RecipeDetail.css";

const RecipeDetail = () => {
  const params = useParams();
  const [recipe, setRecipe] = useState({});
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RecipeDB_API_KEY,
        "X-RapidAPI-Host": "tasty.p.rapidapi.com",
      },
    };
    fetch(
      `https://tasty.p.rapidapi.com/recipes/get-more-info?id=${params.recipeID}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        // console.log(response.instructions);
        setRecipe(response);
      })
      .catch((err) => console.error(err));
    if (SavedRecipes.some((r) => r.id === params.recipeID)) setLiked(true);
  }, [params.recipeID]);

  const handleLiked = () => {
    if (!liked && !SavedRecipes.some((r) => r.id === recipe.id)) {
      SavedRecipes.push(recipe);
    } else if (liked) {
      SavedRecipes = SavedRecipes.filter((r) => r.id !== recipe.id);
    }
    setLiked(!liked);
  };

  return (
    <div className="container">
      <div className="recipe__fig">
        <img src={recipe.thumbnail_url} alt="recipe" className="recipe__img" />
        <h1 className="recipe__title">
          <span>{recipe.name}</span>
        </h1>
      </div>

      <div className="recipe__details">
        <div className="recipe__info">
          <AiOutlineFieldTime className="recipe__info-icon" />
          <span className="recipe__info-data">
            {recipe.total_time_minutes ? recipe.total_time_minutes : "null"}{" "}
            minutes
          </span>
        </div>
        <div className="recipe__info">
          <AiOutlineTeam className="recipe__info-icon" />
          <span className="recipe__info-data">
            {recipe.num_servings ? recipe.num_servings : "null"} servings
          </span>
        </div>

        <button className="btn--round" onClick={handleLiked}>
          {liked ? (
            <AiFillStar className="icon" />
          ) : (
            <AiOutlineStar className="icon" />
          )}
        </button>
      </div>

      <div className="recipe__ingredients">
        <h2>Recipe ingredients</h2>
        <ul className="recipe__ingredient-list">
          {JSON.stringify(recipe) === "{}"
            ? null
            : recipe.sections[0].components.map((component, index) => {
                return (
                  <li className="recipe__ingredient" key={`ingerdient${index}`}>
                    <AiOutlineCheckSquare className="recipe__icon" />
                    <div className="recipe__quantity">
                      {component.measurements[0].quantity}
                    </div>
                    <div className="recipe__description">
                      <span className="recipe__unit">
                        {component.measurements[0].unit.abbreviation}
                      </span>
                      {component.ingredient.name}
                    </div>
                  </li>
                );
              })}
        </ul>
      </div>

      <div className="recipe__directions">
        <h2 className="heading--2">How to cook it</h2>
        <ul className="recipe__directions-list">
          {JSON.stringify(recipe) === "{}"
            ? null
            : recipe.instructions.map((instruction, index) => {
                return (
                  <li key={`direction${index}`}>
                    <p className="recipe__directions-text">
                      <span className="recipe__directions-number">
                        {instruction.position}
                      </span>
                      {instruction.display_text}
                    </p>
                  </li>
                );
              })}
        </ul>
      </div>
    </div>
  );
};

export default RecipeDetail;
