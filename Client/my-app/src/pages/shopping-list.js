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
                console.log(updatedshoppingList);
                setshoppingList(updatedshoppingList);

              } catch (err) {
                console.error(err);
              }

            
        }
        
        fetchShoppingList();

    }, []);



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
                    {shoppingList.map((recipe) => (
                        <tr key={recipe._id}>
                            <td>{recipe.name}</td>
                            <td>
                                {recipe.ingredients.map((ingredient, index) => (
                                    <div key={index}>{ingredient.name}</div> // Display each ingredient
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )


}