import {useEffect, useState} from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";


export const Home = () => {

    const userID = useGetUserID();
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setsavedRecipes] = useState([]);

    useEffect(() => {

        const fetchRecipe = async () => {
            
            try {
                const response = await axios.get("http://localhost:3001/recipe");
                setRecipes(response.data);
                console.log(response.data);
              } catch (err) {
                console.error(err);
              }

        }


        const fetchSavedRecipes = async () => {

            try {
                const response = await axios.get(`http://localhost:3001/recipe/savedRecipes/ids/${userID}`);
                setsavedRecipes(response.data);
              } catch (err) {
                console.error(err);
              }

            
        }
        

        fetchRecipe();
        fetchSavedRecipes();


        console.log(savedRecipes);


    }, []);


    const saveRecipe = async (recipeID) => {

        try {
            const response = await axios.put("http://localhost:3001/recipe", {userID, recipeID});
            //console.log(response)
          } catch (err) {
            console.error(err);
          }


    };


    return <div><h2>Recipes</h2>

    <ul>
        {recipes.map((recipe) => (
            <li key={recipe._id}>
            {Array.isArray(savedRecipes) && savedRecipes.some(savedRecipe => savedRecipe._id === recipe._id) && <h2>SAVED</h2>}

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
                <button onClick={() => saveRecipe(recipe._id)}> Save Recipe </button>
            </li>
        ))}
    </ul>

    
    
    </div>;


}