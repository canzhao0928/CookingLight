import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { RecipeDB_API_KEY, RecipeDB_API_URL } from "../RecipeDB";
import {
  AiOutlineFieldTime,
  AiOutlineTeam,
  AiOutlineStar,
  AiFillStar,
  AiOutlineCheckSquare,
} from "react-icons/ai";
import "./RecipeDetail.css";
import CircularProgress from "@mui/material/CircularProgress";

const RecipeDetail = () => {
  const params = useParams();
  const [recipe, setRecipe] = useState({});
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RecipeDB_API_KEY,
        "X-RapidAPI-Host": RecipeDB_API_URL,
      },
    };
    fetch(
      `https://${RecipeDB_API_URL}/recipes/get-more-info?id=${params.recipeID}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setRecipe(response);
      })
      .catch((err) => console.error(err));

    const savedRecipes = JSON.parse(
      localStorage.getItem("savedRecipes") || "[]"
    );
    if (savedRecipes.some((r) => r.id === +params.recipeID)) setLiked(true);
  }, [params.recipeID]);

  const handleLiked = () => {
    //update saved recipes in local storage
    const savedRecipes = JSON.parse(
      localStorage.getItem("savedRecipes") || "[]"
    );
    if (!liked && !savedRecipes.some((r) => r.id === recipe.id)) {
      savedRecipes.push(recipe);
      console.log(savedRecipes);
      localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    } else if (liked) {
      localStorage.setItem(
        "savedRecipes",
        JSON.stringify(savedRecipes.filter((r) => r.id !== recipe.id))
      );
    }

    //update liked state
    setLiked(!liked);
  };

  console.log(recipe);
  return JSON.stringify(recipe) === "{}" ? (
    <div className="container center">
      <CircularProgress />
    </div>
  ) : (
    <div className="detail__container">
      <div className="recipe__fig">
        <img src={recipe.thumbnail_url} alt="food" className="recipe__img" />
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
