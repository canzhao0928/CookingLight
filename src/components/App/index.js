import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "../Home";
import Saved from "../Saved";
import RecipeDetail from "../RecipeDetail";
import Search from "../Search";
import "./App.css";
import { CiForkAndKnife } from "react-icons/ci";
import SearchBar from "../SearchBar";
import Badge from "@mui/material/Badge";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "#ff0000",
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#11cb5f",
      },
    },
  });

  // const [savedRecipes, setSavedRecipes] = useState([]);

  // useEffect(() => {
  //   localStorage.setItem("savedRecipes", JSON.stringify([]));
  // }, []);

  return (
    <BrowserRouter>
      <nav className="container_nav">
        <a href="/" className="logo">
          <CiForkAndKnife />
          CookingLight
        </a>
        <SearchBar />
        <div className="container_links">
          <Link className="nav_link" to="/">
            <span>Home</span>
          </Link>
          <Link className="nav_link" to="/search">
            <span>Search</span>
          </Link>

          <Link className="nav_link" to="/saved">
            {/* {savedRecipes.length ? (
              <ThemeProvider theme={theme}>
                <Badge
                  badgeContent={savedRecipes.length}
                  color="primary"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: 25,
                      height: 30,
                      minWidth: 30,
                    },
                  }}
                >
                  <span>Saved</span>
                </Badge>
              </ThemeProvider>
            ) : ( */}
            <span>Saved</span>
            {/* )} */}
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="*" element={<p>page not exist</p>} />
        <Route path="/" element={<Home />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/recipe/:recipeID" element={<RecipeDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:query" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
