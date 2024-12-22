import {useEffect, useState} from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";
import {useCookies} from "react-cookie";


export const Saved = () => {

    const userID = useGetUserID();
    const [savedRecipes, setsavedRecipes] = useState([]);
    const [cookies, _] = useCookies(["access_token"]);
    const [sw1tch, setSw1tch] = useState(false); 
    const [shoppingList, setshoppingList] = useState([]);


    useEffect(() => {

        const fetchSavedRecipes = async () => {

            try {
                const response = await axios.get(`http://localhost:3001/recipe/savedRecipes/${userID}` , {headers: {Authorization: cookies.access_token}});
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
            setSw1tch(true);


        }catch(err){

            console.log(err);

        }


    }


    const isSavedShoppingList = (id) => Array.isArray(shoppingList) && shoppingList.includes(id);





    return <div><h1>Saved Recipes</h1>

    <ul>
        {savedRecipes.map((recipe) => (
            <li key={recipe._id}>
                <div>
                    <h2>{recipe.name}</h2>
                </div>
                <div className="instructions">
                    <p>{recipe.instructions}</p>
                </div>
            
                <img alt={recipe.name} src={recipe.imageURL} />
                <p> Preperation Time: {recipe.prepTime}</p>
                <p> Cooking Time: {recipe.cookingTime}</p>
                <h3> Veg Count: {recipe.vegCount}</h3>
                <h3> Fibre: {recipe.totalFibre}</h3>
                <button onClick={() => removeRecipe(recipe._id)}>Remove Recipe</button>
                <button className="button" disabled={isSavedShoppingList(recipe._id)} onClick={() => saveShoppingList(recipe._id)}> {isSavedShoppingList(recipe._id) ? "Added to Shopping List" : "Add to Shopping List"} </button>
            </li>
        ))}
    </ul>

    
    
    </div>;


}