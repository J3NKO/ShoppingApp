import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./componentStyling/navbar.css"


export const NavBar = () => {
  const [cookies, setCookies, removeCookies] = useCookies(["access_token"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          <strong>Recipe App</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create-recipe">
                Create Recipe
              </Link>
            </li>
            {/* Show Saved Recipes only when logged in */}
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/saved-recipes">
                  Saved Recipes
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/shopping-list">
                Shopping List
              </Link>
            </li>

            {/* Conditional rendering based on login state */}
            {!isLoggedIn ? (
              <li className="nav-item">
                <Link className="nav-link" to="/auth">
                  Login/Register
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-danger"
                  onClick={logout}
                  style={{ borderRadius: "50px" }}
                >
                  LOGOUT
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
