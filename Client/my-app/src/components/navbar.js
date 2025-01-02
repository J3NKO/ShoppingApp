import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./componentStyling/navbar.css";

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

  // UseEffect to reset menu state on route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [navigate]);

  // Logout method
  const logout = () => {
    removeCookies("access_token", { path: "/" }); // Remove the access_token cookie
    window.localStorage.removeItem("userID"); // Remove user ID from localStorage
    window.localStorage.removeItem("checkedIngredients"); // Remove checkedIngredients from localStorage
    setIsLoggedIn(false); // Update login state
    navigate("/auth"); // Redirect to login/register page
  };

  // Toggle menu method
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
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
          id="navbarNav"
        >
          {/* Only show close button if menu is open AND screen is mobile */}
          {isMenuOpen && window.innerWidth <= 767 && (
            <button
              className="btn btn-close btn-close-white ms-auto"
              onClick={toggleMenu}
              aria-label="Close menu"
              style={{
                position: "absolute",
                top: "10px",
                right: "20px",
                zIndex: "1051",
                fontSize: "1.5rem",
              }}
            ></button>
          )}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/home" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/create-recipe"
                onClick={toggleMenu}
              >
                Create Recipe
              </Link>
            </li>
            {/* Show Saved Recipes only when logged in */}
            {isLoggedIn && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/saved-recipes"
                  onClick={toggleMenu}
                >
                  Saved Recipes
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/shopping-list"
                onClick={toggleMenu}
              >
                Shopping List
              </Link>
            </li>

            {/* Conditional rendering based on login state */}
            {!isLoggedIn ? (
              <li className="nav-item">
                <Link className="nav-link" to="/auth" onClick={toggleMenu}>
                  Login/Register
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
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
