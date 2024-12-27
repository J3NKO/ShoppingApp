import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import '../components/componentStyling/createRecipe.css';

export const CreateRecipe = () => {

  const userID = useGetUserID(); //self created hook
  const navigate = useNavigate();
  const [cookies, _] = useCookies(["access_token"]);

  // Seting initial state for the recipe
  const [recipe, setRecipe] = useState({
    name: "",
    userOwner: userID, 
    ingredients: [
      { name: "", IsVeg: false, Fibre: 0 }, 
    ],
    instructions: "",
    totalFibre: 0,
    cookingTime: 0,
    prepTime: 0,
    vegCount: 0,
    imageURL: "",
  });





  // Handle general input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  // Add a new ingredient object to the ingredients array
  const addIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { name: "", IsVeg: false, Fibre: "" }],
    });
  };

  // Handle changes to a specific ingredient field
  const handleIngredientChange = (event, index, field) => {
    const { value, type: inputType } = event.target;
    const updatedIngredients = [...recipe.ingredients];
  
    updatedIngredients[index][field] = 
      inputType === "checkbox"
        ? event.target.checked // Handle checkbox
        : field === "Fibre"
          ? Number(value) // Convert numeric fields
          : value; // Default for ints
  
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };
  
  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/recipe", recipe, {headers: {Authorization: cookies.access_token}});
      alert("Recipe Created");
    } catch (err) {
      console.error(err);
    }

    navigate("/home");
  };

  //remove an ingredient
  const removeIngredient = (indexToRemove) => {
    setRecipe({
      ...recipe,
      ingredients: recipe.ingredients.filter((_, index) => index !== indexToRemove)
    });
  };

  return (
    <div className="create-recipe">
      <h1>Create Recipe</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
        />

        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient">
            <div>
              <label htmlFor={`ingredient-name-${index}`}>Name:</label>
              <input
                type="text"
                id={`ingredient-name-${index}`}
                value={ingredient.name}
                onChange={(event) => handleIngredientChange(event, index, "name")}
              />
            </div>

            <div>
              <label htmlFor={`ingredient-isVeg-${index}`}>Vegetable?</label>
              <input
                type="checkbox"
                id={`ingredient-isVeg-${index}`}
                checked={ingredient.IsVeg}
                onChange={(event) => handleIngredientChange(event, index, "IsVeg")}
              />
            </div>

            <div>
              <label htmlFor={`ingredient-fibre-${index}`}>Fibre:</label>
              <input
                type="number"
                id={`ingredient-fibre-${index}`}
                value={ingredient.Fibre}
                onChange={(event) => handleIngredientChange(event, index, "Fibre")}
              />
            </div>

            {/* Only show remove button if there's more than one ingredient */}
            {recipe.ingredients.length > 1 && (
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="remove-ingredient-btn"
                aria-label="Remove ingredient"
              >
                ×
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addIngredient}>
          Add Ingredient
        </button>

        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="imageURL">Image URL</label>
        <input
          type="text"
          id="imageURL"
          name="imageURL"
          value={recipe.imageURL}
          onChange={handleChange}
        />

        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
        />

        <label htmlFor="prepTime">Prep Time (minutes)</label>
        <input
          type="number"
          id="prepTime"
          name="prepTime"
          value={recipe.prepTime}
          onChange={handleChange}
        />

        <label htmlFor="vegCount">Vegetable Count</label>
        <input
          type="number"
          id="vegCount"
          name="vegCount"
          value={recipe.vegCount}
          onChange={handleChange}
        />

        <label htmlFor="totalFibre">Total Fibre</label>
        <input
          type="number"
          id="totalFibre"
          name="totalFibre"
          value={recipe.totalFibre}
          onChange={handleChange}
        />

        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};
