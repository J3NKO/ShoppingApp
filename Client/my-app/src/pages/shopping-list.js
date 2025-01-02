import {useEffect, useState} from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";
import {useCookies} from "react-cookie";
import '../components/componentStyling/shoppingList.css';
import SearchBar from "../components/SearchBar.js";


export const ShoppingList = () => {

    const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"]);
    const [shoppingList, setShoppingList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [sw1tch, setSw1tch] = useState(false); 
    const [checkedIngredients, setCheckedIngredients] = useState(() => {
        const saved = localStorage.getItem('checkedIngredients');
        return saved ? JSON.parse(saved) : {};
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {



        const fetchShoppingList = async () => {

            try {
                const response = await axios.get(`http://localhost:3001/recipe/shoppingList/${userID}`
                    , {headers: {Authorization: cookies.access_token}}
                );
                const updatedshoppingList =  response.data; 
                
                
                setShoppingList(updatedshoppingList);
                setFilteredList(updatedshoppingList);

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
                        
                        setShoppingList(updatedshoppingList);
        
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
                
                setCheckedIngredients(prev => {
                    const updated = {...prev};
                    Object.keys(updated).forEach(key => {
                        if (key.startsWith(`${recipeID}-`)) {
                            delete updated[key];
                        }
                    });
                    localStorage.setItem('checkedIngredients', JSON.stringify(updated));
                    return updated;
                });

                setShoppingList(newShoppingList);
                setFilteredList(prevFiltered => 
                    prevFiltered.filter(recipe => recipe._id !== recipeID)
                );
                setSw1tch(true);

    
            }catch(err){
    
                console.log(err);
    
            }
    
    
        }

    const handleCheckIngredient = (recipeId, ingredientIndex) => {
        setCheckedIngredients(prev => {
            const updated = {
                ...prev,
                [`${recipeId}-${ingredientIndex}`]: !prev[`${recipeId}-${ingredientIndex}`]
            };
            localStorage.setItem('checkedIngredients', JSON.stringify(updated));
            return updated;
        });
    };

    const handleSearch = async (searchTerm) => {
        try {
            setLoading(true);
            setError(null);
            
            if (!searchTerm.trim()) {
                setFilteredList(shoppingList);
                return;
            }

            const filtered = shoppingList.filter(recipe => 
                recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                recipe.ingredients.some(ing => 
                    ing.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            
            setFilteredList(filtered);
        } catch (err) {
            setError('Failed to search recipes');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="shopping-list">
            <h1>Shopping List</h1>
            <SearchBar onSearch={handleSearch} />
            {error && <div className="error-message">{error}</div>}
            <table className="shopping-table">
                <thead>
                    <tr>
                        <th>Recipe Name</th>
                        <th>Ingredients</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(filteredList || []).length > 0 ? (
                        filteredList.map((recipe) => (
                            <tr key={recipe._id} className="recipe-row">
                                <td className="recipe-name">{recipe?.name || "Loading Recipes..."}</td>
                                <td>
                                    <div className="ingredients-list">
                                        {(recipe?.ingredients || []).map((ingredient, index) => (
                                            <div 
                                                key={index} 
                                                className={`ingredient-item ${
                                                    checkedIngredients[`${recipe._id}-${index}`] ? 'checked' : ''
                                                }`}
                                            >
                                                <label className="ingredient-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        checked={checkedIngredients[`${recipe._id}-${index}`] || false}
                                                        onChange={() => handleCheckIngredient(recipe._id, index)}
                                                    />
                                                    <span className="checkmark"></span>
                                                    <span className="ingredient-name">
                                                        {ingredient?.name || "Loading Ingredients..."}
                                                    </span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td>
                                    <button 
                                        className="remove-recipe-btn"
                                        onClick={() => removeRecipe(recipe._id)}
                                    >
                                        Remove Meal
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{ textAlign: 'center', padding: '2rem' }}>
                                No recipes in your shopping list!
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )


}