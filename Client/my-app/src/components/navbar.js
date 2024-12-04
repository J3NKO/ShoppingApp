import { Link, useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie";


export const NavBar = () => {

    const [cookies, setCookies] = useCookies("access_token");
    const navigate = useNavigate();


    //logut method to work with logout button by offloading cookie in browser window and resetting access cookie
    const logout = () => {
        setCookies("access_token", "", { path: "/" }); // Clear cookie globally
        window.localStorage.removeItem("userID"); // Remove user ID from localStorage
        navigate("/auth"); // Redirect to login/register page
    };


return <div className="navbar">

    {/* NAVBAR LINKS TO MAIN PAGES */}
    <Link to="/home">Home</Link>
    <Link to="/create-recipe">Create Recipe</Link>
    <Link to="/saved-recipes">Saved Recipes</Link>
    <Link to="/shopping-list">Shopping List</Link>
    {!cookies.access_token ? (<Link to="/auth">Login/Register</Link>):<button onClick={logout}>LOGOUT</button>}

</div>


}