import "./Nav.css";

import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav">
      <Link to="/recipes">Home</Link>
      <h1>Henry Food</h1>
      <Link to="/recipes/create">Create Recipe</Link>
    </div>
  );
};

export default Nav;