import {useEffect, useState} from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";
import {useCookies} from "react-cookie";
import '../components/componentStyling/SavedRecipes.css';
import SearchBar from "../components/SearchBar.js";


export const Saved = () => {

    const userID = useGetUserID();
    const [savedRecipes, setsavedRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [cookies, _] = useCookies(["access_token"]);
    const [sw1tch, setSw1tch] = useState(false); 
    const [shoppingList, setshoppingList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {

        const fetchSavedRecipes = async () => {

            try {
                const response = await axios.get(`http://localhost:3001/recipe/savedRecipes/${userID}` , {headers: {Authorization: cookies.access_token}});
                const savedRecipesArray = Object.values(response.data).flat(); // Combine all arrays into a single array
                setsavedRecipes(savedRecipesArray);
                setFilteredRecipes(savedRecipesArray);
               
              } catch (err) {
                console.error(err);
              }
            }

        const fetchShoppingList = async () => {

            try {
                const response = await axios.get(`http://localhost:3001/recipe/shoppingList/ids/${userID}`
                    , {headers: {Authorization: cookies.access_token}}
                );
                const shoppingList =  response.data.shoppingList; 
  
                setshoppingList(shoppingList);
                
              } catch (err) {
                console.error(err);
              }

            
        }
        
        
        fetchShoppingList();
        fetchSavedRecipes();
    
    }, []);

    useEffect(() => {
        
        if (sw1tch) {
            const fetchSavedRecipes = async () => {
                try {
                    const response = await axios.get(`http://localhost:3001/recipe/savedRecipes/${userID}`, {
                        headers: { Authorization: cookies.access_token },
                    });
                    const savedRecipesArray = Object.values(response.data).flat();
                    setsavedRecipes(savedRecipesArray);
                } catch (err) {
                    console.error(err);
                }
            };
    
            fetchSavedRecipes();
            setSw1tch(false);
        }
    }, [sw1tch]);

    
    const saveShoppingList = async (recipeID) => {
        
        try {
            const response = await axios.put(
                "http://localhost:3001/recipe/shoppingList",
                { userID, recipeID },
                { headers: { Authorization: cookies.access_token } }
            );
    
            // Access the ShoppingList property
            const updatedShoppingList = response.data.ShoppingList; 

            if (updatedShoppingList) {
                setshoppingList(updatedShoppingList); // Update the state with the new shopping list
                
            } else {
                console.error("ShoppingList is undefined in API response");
            }
        } catch (err) {
            console.error("Error saving shopping list:", err);
        }
    };    
    


    const removeRecipe = async (recipeID) => {

        try{
        
            const response = await axios.delete(`http://localhost:3001/recipe/savedRecipes/${userID}/${recipeID}`, {headers: {Authorization: cookies.access_token}});
            
            const newSavedRecipes = response.data.savedRecipes;
           
            setsavedRecipes(newSavedRecipes);
            setFilteredRecipes(prevFiltered => 
                prevFiltered.filter(recipe => recipe._id !== recipeID)
            );
            setSw1tch(true);
        } catch(err) {
            console.log(err);
        }
    }


    const isSavedShoppingList = (id) => Array.isArray(shoppingList) && shoppingList.includes(id);

    const handleSearch = async (searchTerm) => {
        try {
            setLoading(true);
            setError(null);
            
            if (!searchTerm.trim()) {
                setFilteredRecipes(savedRecipes);
                return;
            }

            //converted to lowercase to make the search case insensitive
            const filtered = savedRecipes.filter(recipe => 
                recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                recipe.instructions.toLowerCase().includes(searchTerm.toLowerCase()) ||
                recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            
            setFilteredRecipes(filtered);
        } catch (err) {
            setError('Failed to search recipes');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };





    return (
        <div className="saved-recipes">
            <h1>Saved Recipes</h1>
            <SearchBar onSearch={handleSearch} />
            {error && <div className="error-message">{error}</div>}
            <ul className="recipes-grid">
                {filteredRecipes.map((recipe) => (
                    <li key={recipe._id} className="recipe-card">
                        <img className="recipe-image" alt={recipe.name} src={recipe.imageURL} />
                        <div className="recipe-content">
                            <h2 className="recipe-title">{recipe.name}</h2>
                            <div className="recipe-instructions">
                                <p>{recipe.instructions}</p>
                            </div>
                            <div className="recipe-meta">
                                <div className="meta-item">
                                    <div className="meta-label">Prep Time</div>
                                    <div className="meta-value">{recipe.prepTime}</div>
                                </div>
                                <div className="meta-item">
                                    <div className="meta-label">Cook Time</div>
                                    <div className="meta-value">{recipe.cookingTime}</div>
                                </div>
                                <div className="meta-item">
                                    <div className="meta-label">Veg Count</div>
                                    <div className="meta-value">{recipe.vegCount}</div>
                                </div>
                                <div className="meta-item">
                                    <div className="meta-label">Fibre</div>
                                    <div className="meta-value">{recipe.totalFibre}</div>
                                </div>
                            </div>
                            <div className="recipe-actions">
                                <button 
                                    className="recipe-button remove-button"
                                    onClick={() => removeRecipe(recipe._id)}
                                >
                                    Remove Recipe
                                </button>
                                <button 
                                    className="recipe-button shopping-list-button"
                                    disabled={isSavedShoppingList(recipe._id)}
                                    onClick={() => saveShoppingList(recipe._id)}
                                >
                                    {isSavedShoppingList(recipe._id) ? "Added to List" : "Add to List"}
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};