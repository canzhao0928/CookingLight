import RecipeList from "../RecipeList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecipeDB_API_KEY } from "../RecipeDB";
import { TopSearchs, HistorySearchs } from "../RecipeDB";
import "./Search.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import ListItemText from "@mui/material/ListItemText";
import { Card } from "@mui/material";

import { CiFaceFrown } from "react-icons/ci";

const Search = () => {
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
      {!params.query || recipes.length === 0 ? (
        <>
          <div className="container">
            <h2>
              <CiFaceFrown />
              Opps! Entere the keywords or change to another keyword you need to
              search for...
            </h2>
            <h2>To see what people are searching for:</h2>
          </div>
          <div className="container grid-col-2">
            <Card sx={{ maxWidth: 345, minWidth: 275, pt: 2, pl: 2 }}>
              <h2 className="heading_secondary">Top search</h2>
              <List dense={false}>
                {TopSearchs.map((search, index) => {
                  return (
                    <ListItem key={index}>
                      <a href={`/search/${search}`}>
                        <ListItemText
                          primary={`${index + 1} ${search}`}
                          primaryTypographyProps={{
                            fontSize: 20,
                            fontWeight: "medium",
                            letterSpacing: 0,
                          }}
                        />
                      </a>
                    </ListItem>
                  );
                })}
              </List>
            </Card>

            <Card sx={{ maxWidth: 345, minWidth: 275, pt: 2, pl: 2 }}>
              <h2 className="heading_secondary">Search history</h2>
              <List dense={false}>
                {HistorySearchs.map((search, index) => {
                  return (
                    <ListItem key={index}>
                      <a href={`/search/${search}`}>
                        <ListItemText
                          primary={`${index + 1} ${search}`}
                          primaryTypographyProps={{
                            fontSize: 20,
                            fontWeight: "medium",
                            letterSpacing: 0,
                          }}
                        />
                      </a>
                    </ListItem>
                  );
                })}
              </List>
            </Card>
          </div>
        </>
      ) : (
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
