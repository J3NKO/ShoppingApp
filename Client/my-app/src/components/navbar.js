import { Link } from "react-router-dom";

export const NavBar = () => {


return <div className="navbar">

    {/* NAVBAR LINKS TO MAIN PAGES */}
    <Link to="/home">Home</Link>
    <Link to="/create-recipe">Create Recipe</Link>
    <Link to="/saved-recipes">Saved Recipes</Link>
    <Link to="/shopping-list">Shopping List</Link>
    <Link to="/auth">Login/Register</Link>

</div>


}