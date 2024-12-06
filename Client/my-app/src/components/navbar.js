import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

export const NavBar = () => {
  const [cookies, setCookies, removeCookies] = useCookies("access_token");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Update login state based on cookies
  useEffect(() => {
    if (cookies.access_token) {
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // User is logged out
    }
  }, [cookies.access_token]); // Run effect when cookies change

  // Logout method
  const logout = () => {
    removeCookies("access_token", { path: "/" }); // Remove the access_token cookie
    window.localStorage.removeItem("userID"); // Remove user ID from localStorage
    setIsLoggedIn(false); // Update login state
    navigate("/auth"); // Redirect to login/register page
  };

  return (
    <div className="navbar">
      {/* NAVBAR LINKS TO MAIN PAGES */}
      <Link to="/home">Home</Link>
      <Link to="/create-recipe">Create Recipe</Link>
      <Link to="/saved-recipes">Saved Recipes</Link>
      <Link to="/shopping-list">Shopping List</Link>
      {/* Conditional rendering based on login state */}
      {!isLoggedIn ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <button onClick={logout}>LOGOUT</button>
      )}
    </div>
  );
};
