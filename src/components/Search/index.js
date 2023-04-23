import RecipeList from "../RecipeList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecipeDB_API_KEY, RecipeDB_API_URL } from "../RecipeDB";
import { TopSearchs, HistorySearchs } from "../RecipeDB";
import "./Search.css";
import ListCard from "../ListCard";
import { CiFaceFrown } from "react-icons/ci";
import CircularProgress from "@mui/material/CircularProgress";

const Search = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  let params = useParams();

  useEffect(() => {
    const url = `https://${RecipeDB_API_URL}/recipes/list?from=0&size=20&tags=under_30_minutes&q=${params.query}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RecipeDB_API_KEY,
        "X-RapidAPI-Host": RecipeDB_API_URL,
      },
    };
    setLoading(true);
    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setLoading(false);
        return setRecipes(response.results);
      })
      .catch((err) => console.error(err));
  }, [params.query]);

  return (
    <>
      {/* no input return hints */}
      {!params.query ? (
        <>
          <div className="container">
            <h2>Enter the keywords you need to search for...</h2>
            <h2>To see what people are searching for:</h2>
          </div>
          <div className="container grid-col-2">
            <ListCard title="Top Search" array={TopSearchs} />
            <ListCard title="Search history" array={HistorySearchs} />
          </div>
        </>
      ) : loading ? (
        // is loading display CircularProgress
        <div className="container center">
          <CircularProgress />
        </div>
      ) : recipes.length === 0 ? (
        // after loading return 0, display error messages
        <>
          <div className="container">
            <h2>
              <CiFaceFrown />
              Oops! Enter another keywords to search for...
            </h2>
            <h2>To see what people are searching for:</h2>
          </div>
          <div className="container grid-col-2">
            <ListCard title="Top Search" array={TopSearchs} />
            <ListCard title="Search history" array={HistorySearchs} />
          </div>
        </>
      ) : (
        // after loading return data, display data
        <div className="container grid-col-3">
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

export default Search;
