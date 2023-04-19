import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "../Home";
import Saved from "../Saved";
import RecipeDetail from "../RecipeDetail";
import RecipesLibrary from "../RecipesLibrary";
import "./App.css";
import { CiForkAndKnife } from "react-icons/ci";

function App() {
  return (
    <BrowserRouter>
      <nav className="container_nav">
        <p className="logo">
          <CiForkAndKnife />
          CookingLight
        </p>
        <Link className="nav_link" to="/">
          Home
        </Link>
        <Link className="nav_link" to="/recipes">
          Recipes
        </Link>
        <Link className="nav_link" to="/saved">
          Saved
        </Link>
      </nav>
      <Routes>
        <Route path="*" element={<p>page not exist</p>} />
        <Route path="/" element={<Home />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/recipe/:recipeID" element={<RecipeDetail />} />
        <Route path="/recipes" element={<RecipesLibrary />} />
        <Route path="/recipes/:query" element={<RecipesLibrary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
