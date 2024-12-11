import {useEffect, useState} from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";
import {useCookies} from "react-cookie";

export const Home = () => {

    const userID = useGetUserID();
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setsavedRecipes] = useState([]);
    const [cookies, _] = useCookies(["access_token"]);
    const [shoppingList, setshoppingList] = useState([]); 


    useEffect(() => {

        const fetchRecipe = async () => {
            
            try {
                const response = await axios.get("http://localhost:3001/recipe" , {headers: {Authorization: cookies.access_token}});
                setRecipes(response.data);
                //console.log(response.data);
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
                //console.log(savedRecipes);
              } catch (err) {
                console.error(err);
              }

            
        }
        

        const fetchShoppingList = async () => {

            try {
                const response = await axios.get(`http://localhost:3001/recipe/shoppingList/ids/${userID}`
                    , {headers: {Authorization: cookies.access_token}}
                );
                const shoppingList =  Object.values(response.data).flat(); // Combine all arrays into a single array
                console.log("test");//print twice
                console.log("test" + Object.values(response.data).flat());
                setshoppingList(shoppingList);
                console.log(shoppingList);
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
            //console.log(response.data)
            setsavedRecipes(response.data.savedRecipes);
          } catch (err) {
            console.error(err);
          }


    };

    const saveShoppingList = async (recipeID) => {

        try {
            const response = await axios.put("http://localhost:3001/recipe/shoppingList", {userID, recipeID}
                , {headers: {Authorization: cookies.access_token}}
            );
            //console.log(response.data)
            setshoppingList(response.data.shoppingList);
          } catch (err) {
            console.error(err);
          }


    };


    const isSaved = (id) => savedRecipes.includes(id);
    const isSavedShoppingList = (id) => shoppingList.includes(id);



    return <div><h1>Recipes</h1>

    <ul>
        {recipes.map((recipe) => (
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
                <button className="button" disabled={isSaved(recipe._id)} onClick={() => saveRecipe(recipe._id)}> {isSaved(recipe._id) ? "Recipe Saved" : "Save"} </button>
                <button className="button" disabled={isSavedShoppingList(recipe._id)} onClick={() => saveShoppingList(recipe._id)}> {isSavedShoppingList(recipe._id) ? "Added to Shopping List" : "Add to Shopping List"} </button>
            </li>
        ))}
    </ul>

    
    
    </div>;


}