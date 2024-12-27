import {useEffect, useState} from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";
import {useCookies} from "react-cookie";
import '../components/componentStyling/home.css';

export const Home = () => {

    const userID = useGetUserID();
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setsavedRecipes] = useState([]);
    const [shoppingList, setshoppingList] = useState([]);
    const [cookies, _] = useCookies(["access_token"]); 


    useEffect(() => {

        const fetchRecipe = async () => {
            
            try {
                const response = await axios.get("http://localhost:3001/recipe" , {headers: {Authorization: cookies.access_token}});
                setRecipes(response.data);

              } catch (err) {
                console.error(err);
              }

        }


        const fetchSavedRecipes = async () => {

            try {
                const response = await axios.get(`http://localhost:3001/recipe/savedRecipes/ids/${userID}`
                    , {headers: {Authorization: cookies.access_token}}
                );
                const savedRecipesArray = Object.values(response.data).flat(); // Combine all arrays into a single array
                setsavedRecipes(savedRecipesArray);
               
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
        


        fetchRecipe();
        fetchSavedRecipes();
        fetchShoppingList();




    }, []);

    


    const saveRecipe = async (recipeID) => {

        try {
            const response = await axios.put("http://localhost:3001/recipe", {userID, recipeID}
                , {headers: {Authorization: cookies.access_token}}
            );
            
            setsavedRecipes(response.data.savedRecipes);
          } catch (err) {
            console.error(err);
          }


    };
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
    
    


    const isSaved = (id) => savedRecipes.includes(id);

    const isSavedShoppingList = (id) => Array.isArray(shoppingList) && shoppingList.includes(id);


    


    return (
        <div className="recipes-container">
            <h1 className="page-title">Recipes</h1>
            <ul className="recipes-grid">
                {recipes.map((recipe) => (
                    <li key={recipe._id} className="recipe-card">
                        <img 
                            className="recipe-image" 
                            alt={recipe.name} 
                            src={recipe.imageURL}
                        />
                        <div className="recipe-content">
                            <h2 className="recipe-title">{recipe.name}</h2>
                            <div className="recipe-instructions">
                                <p>{recipe.instructions}</p>
                            </div>
                            <div className="recipe-meta">
                                <div className="recipe-stat">
                                    <div>Prep Time</div>
                                    <strong>{recipe.prepTime}</strong>
                                </div>
                                <div className="recipe-stat">
                                    <div>Cook Time</div>
                                    <strong>{recipe.cookingTime}</strong>
                                </div>
                                <div className="recipe-stat">
                                    <div>Veg Count</div>
                                    <strong>{recipe.vegCount}</strong>
                                </div>
                                <div className="recipe-stat">
                                    <div>Fibre</div>
                                    <strong>{recipe.totalFibre}</strong>
                                </div>
                            </div>
                            <div className="recipe-buttons">
                                <button 
                                    className={`button save-button`}
                                    disabled={isSaved(recipe._id)}
                                    onClick={() => saveRecipe(recipe._id)}
                                >
                                    {isSaved(recipe._id) ? "Recipe Saved" : "Save"}
                                </button>
                                <button 
                                    className={`button shopping-list-button`}
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


}