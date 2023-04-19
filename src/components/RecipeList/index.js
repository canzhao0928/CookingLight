import "./RecipeList.css";
import { useNavigate } from "react-router-dom";

const RecipeList = ({ id, img, name, description }) => {
  let navigate = useNavigate();
  const handleMoreDetail = () => {
    console.log(id);
    const path = `/recipe/${id}`;
    navigate(path);
  };
  return (
    <div className="container_list">
      <img className="recipe_img" src={img} alt="recipe" />
      <h2 className="text__list">{name}</h2>
      <p className="discreption__list">{description}</p>
      <button className="btn btn-grey" onClick={handleMoreDetail}>
        More Detail
      </button>
    </div>
  );
};

export default RecipeList;
