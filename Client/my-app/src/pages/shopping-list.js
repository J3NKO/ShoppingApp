import {useEffect, useState} from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";
import {useCookies} from "react-cookie";


export const ShoppingList = () => {

    const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"]);
    const [shoppingList, setshoppingList] = useState([]);
    const [sw1tch, setSw1tch] = useState(false); 

    useEffect(() => {



        const fetchShoppingList = async () => {

            try {
                const response = await axios.get(`http://localhost:3001/recipe/shoppingList/${userID}`
                    , {headers: {Authorization: cookies.access_token}}
                );
                const updatedshoppingList =  response.data; 
                
                
                setshoppingList(updatedshoppingList);

              } catch (err) {
                console.error(err);
              }

            
        }

        
        fetchShoppingList();

    }, []);


    useEffect(() => {
            
            if (sw1tch) {
                const fetchSavedRecipes = async () => {
                    try {
                        const response = await axios.get(`http://localhost:3001/recipe/shoppingList/${userID}`
                            , {headers: {Authorization: cookies.access_token}}
                        );
                        const updatedshoppingList =  response.data; 
                        
                        setshoppingList(updatedshoppingList);
        
                      } catch (err) {
                        console.error(err);
                      }
                };
        
                fetchSavedRecipes();
                setSw1tch(false);
            }
        }, [sw1tch]);

    

    const removeRecipe = async (recipeID) => {
    
            try{
            
                const response = await axios.delete(`http://localhost:3001/recipe/shoppingList/${userID}/${recipeID}`, {headers: {Authorization: cookies.access_token}});
                const newShoppingList = response.data.ShoppingList;
                
                setshoppingList(newShoppingList);
                setSw1tch(true);

    
            }catch(err){
    
                console.log(err);
    
            }
    
    
        }



    return (
        <div>
            <h1>Shopping List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Recipe Name</th>
                        <th>Ingredients</th>
                    </tr>
                </thead>
                <tbody>
                 {(shoppingList || []).length > 0 ? (
                    shoppingList.map((recipe) => (
                    <tr key={recipe._id}>
                      <td>{recipe?.name || "Loading Recipes..."}</td>

                      <td>
                        {(recipe?.ingredients || []).map((ingredient, index) => (
                        <div key={index}>
                            <label>
                                <input type="checkbox" />
                                {ingredient?.name || "Loading Inredients..."}
                            </label>
                        </div>
                        ))}
                      </td>

                        <td>
                        <button onClick={() => removeRecipe(recipe._id)}>Remove Meal</button>
                        </td>

                    </tr>
                 ))) : (
                    <tr>
                        <td colSpan="3">No recipes in your shopping list!</td>
                    </tr>
                        )}
                </tbody>


            </table>
        </div>
    )


}