import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "../Home";
import Saved from "../Saved";
import RecipeDetail from "../RecipeDetail";
import Search from "../Search";
import "./App.css";
import { CiForkAndKnife } from "react-icons/ci";
import SearchBar from "../SearchBar";

function App() {
  return (
    <BrowserRouter>
      <nav className="container_nav">
        <Link className="logo" to="/">
          <CiForkAndKnife />
          CookingLight
        </Link>
        <SearchBar />
        <div className="container_links">
          <Link className="nav_link" to="/">
            <span>Home</span>
          </Link>
          <Link className="nav_link" to="/search">
            <span>Search</span>
          </Link>

          <Link className="nav_link" to="/saved">
            <span>Saved</span>
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
