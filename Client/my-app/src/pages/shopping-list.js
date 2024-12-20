import {useEffect, useState} from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";
import {useCookies} from "react-cookie";


export const ShoppingList = () => {

    const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"]);
    const [shoppingList, setshoppingList] = useState([]);

    useEffect(() => {



        const fetchShoppingList = async () => {

            try {
                const response = await axios.get(`http://localhost:3001/recipe/shoppingList/${userID}`
                    , {headers: {Authorization: cookies.access_token}}
                );
                const updatedshoppingList =  response.data; 
                //console.log("test" + Object.values(response.data).flat());
                
                setshoppingList(updatedshoppingList);

              } catch (err) {
                console.error(err);
              }

            
        }

        
        fetchShoppingList();

    }, [shoppingList]);

    

    const removeRecipe = async (recipeID) => {
    
            try{
            
                const response = await axios.delete(`http://localhost:3001/recipe/shoppingList/${userID}/${recipeID}`, {headers: {Authorization: cookies.access_token}});
                console.log(response);
                console.log(response.data.ShoppingList);
                const newShoppingList = response.data.ShoppingList;
                console.log(newShoppingList);
                setshoppingList(newShoppingList);
    

    
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
                      <td>{recipe?.name || "Unnamed Recipe"}</td>

                      <td>
                        {(recipe?.ingredients || []).map((ingredient, index) => (
                        <div key={index}>
                            <label>
                                <input type="checkbox" />
                                {ingredient?.name || "Unnamed Ingredient"}
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