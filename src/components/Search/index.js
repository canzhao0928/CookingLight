import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const Search = () => {
  const [value, setValue] = useState("");
  let navigate = useNavigate();
  const handleSearch = () => {
    const path = `/recipes/${value}`;
    navigate(path);
    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="container__search">
      <input
        className="input__search"
        placeholder="Name of food or ingredients"
        name={value}
        onChange={handleChange}
      />
      <button className="btn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
