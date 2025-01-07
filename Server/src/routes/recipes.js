import { RecipeModel } from "../models/Recipes.js";
import express from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/Users.js"
import { verifyToken } from "./users.js";

//set up http routes for recipes model
const router = express.Router();


router.get("/", verifyToken,async(req, res) => {

    try{

        const response = await RecipeModel.find({});//get all recipes
        res.json(response);


    }catch(err){

        res.json(err);

    }

});


//create new recipe
router.post("/", verifyToken, async(req, res) => {

    //console.log({...req.body});
    //create an instance of the recipe
    const recipe = new RecipeModel({

        //spread operator for easiness
        ...req.body

    });

    try{

        const response = await recipe.save();//get all recipes
        res.json(response);


    }catch(err){

        res.json(err);

    }
});



///////////////////////////////////
//save a recipe
router.put("/", verifyToken,async(req, res) => {

    try{

        //get recipe we want to save in User Collection
        const recipe = await RecipeModel.findById(req.body.recipeID);
        //get User
        const user = await UserModel.findById(req.body.userID);
    
        //push new recipe to saved recipe in Users collection
        user.savedRecipes.push(recipe);

        user.save();

        //return object array of saved recipes
        res.json({savedRecipes : user.savedRecipes});


    }catch(err){

        res.json(err);

    }
});


//save recipe to shopping list in User Document
router.put("/shoppingList", verifyToken,async(req, res) => {

    try{

        //get recipe we want to save in User Collection
        const recipe = await RecipeModel.findById(req.body.recipeID);
        //get User
        const user = await UserModel.findById(req.body.userID);
    
        //push new recipe to saved recipe in Users collection
        user.shoppingList.push(recipe);

        user.save();

        //return object array of saved recipes
        res.json({ShoppingList : user.shoppingList});


    }catch(err){

        res.json(err);

    }
});

//get recipes from shopping list based on ID from logged in user
router.get("/shoppingList/ids/:userID", verifyToken,async (req, res) => {

    try{
    
        const user = await UserModel.findById(req.params.userID);
    
        res.json({shoppingList : user?.shoppingList})
    
    }catch(err){
    
        res.json(err);
    
    
    }
    
});



//get saved recipe from specific user
router.get("/savedRecipes/ids/:userID", verifyToken,async (req, res) => {

try{

    const user = await UserModel.findById(req.params.userID);

    res.json({savedRecipes : user?.savedRecipes})

}catch(err){

    res.json(err);


}


});

//get saved recipes ID's from specific user
router.get("/savedRecipes/:userID", verifyToken,async (req, res) => {

    try{
    
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipeModel.find({

            //mongoose 'in' query syntax
            _id : {$in : user.savedRecipes},


        })

        res.json(savedRecipes);
    
    }catch(err){
    
        res.json(err);
    
    
    }
    
    
    });

//get shopping list recipe ID's from specific user
router.get("/shoppingList/:userID", verifyToken,async (req, res) => {

    try{
    
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipeModel.find({

            //mongoose 'in' query syntax
            _id : {$in : user.shoppingList},


        })

        res.json(savedRecipes);
    
    }catch(err){
    
        res.json(err);
    
    
    }
    
    
    });



//remove recipe from Shopping list
router.delete("/shoppingList/:userID/:recipeID", verifyToken, async (req, res) => {
    try {
        // Get the user
        const user = await UserModel.findById(req.params.userID);

        // Remove the recipe ID from the shopping list, convert OBjectID datat type to string to avoid error
        user.shoppingList = user.shoppingList.filter(
            (recipeID) => recipeID.toString() !== req.params.recipeID
        );

        await user.save();

        // Return updated shopping list
        res.json({ ShoppingList: user?.shoppingList });
    } catch (err) {
        res.status(500).json(err);
    }
});


//remove recipe from Saved Recipes
router.delete("/SavedRecipes/:userID/:recipeID", verifyToken, async (req, res) => {
    try {
        // Get the user
        const user = await UserModel.findById(req.params.userID);

        
        user.savedRecipes = user.savedRecipes.filter(
            (recipeID) => recipeID.toString() !== req.params.recipeID
        );

        await user.save();

        
        res.json({ savedRecipes: user?.savedRecipes });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Search Route for HomePage
router.get("/search", verifyToken, async (req, res) => {
    try {
        //get search term from URL query
        const searchTerm = req.query.term;
        if (!searchTerm) {
            return res.status(400).json({ message: "Search term is required" });
        }

        const searchRegex = new RegExp(searchTerm, 'i');

        //search for recipes based on name, instructions, or ingredients
        const recipes = await RecipeModel.find({
            $or: [
                { name: searchRegex },
                { instructions: searchRegex },
                { ingredients: searchRegex }
            ]
        });

        res.json(recipes);
    } catch (err) {
        console.error("Search error:", err);
        res.status(500).json({ message: "Error searching recipes" });
    }
});

export {router as RecipeRouter};