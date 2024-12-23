import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Home} from "./pages/home.js";
import {Auth} from "./pages/auth.js";
import {CreateRecipe} from "./pages/create-recipe.js";
import {ShoppingList} from "./pages/shopping-list.js";
import {Saved} from "./pages/saved-recipes.js";
import { NavBar } from './components/navbar.js';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";



function App() {
  return (
    <div className="App">
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="/auth" element={<Auth/>}></Route>
        <Route path="/create-recipe" element={<CreateRecipe/>}></Route>
        <Route path="/shopping-list" element={<ShoppingList/>}></Route>
        <Route path="/saved-recipes" element={<Saved/>}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
