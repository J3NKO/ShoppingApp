import { RecipeModel } from "../models/Recipes.js";
import express from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/Users.js";

//set up http routes for recipes model
const router = express.Router();


router.get("/", async(req, res) => {

    try{

        const response = await RecipeModel.find({});//get all recipes
        res.json(response);


    }catch(err){

        res.json(err);

    }

});


//create new recipe
router.post("/", async(req, res) => {

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
router.put("/", async(req, res) => {

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


//get recipe IDs from specific user
router.get("/savedRecipes/ids", async (req, res) => {

try{

    const user = await UserModel.findById(req.body.userID);

    res.json({savedRecipes : user?.savedRecipes})

}catch(err){

    res.json(err);


}


});

//get saved recipes from specific user
router.get("/savedRecipes", async (req, res) => {

    try{
    
        const user = await UserModel.findById(req.body.userID);
        const savedRecipes = await RecipeModel.find({

            //mongoose 'in' query syntax
            _id : {$in : user.savedRecipes},


        })

        res.json(savedRecipes);
    
    }catch(err){
    
        res.json(err);
    
    
    }
    
    
    });



export {router as RecipeRouter};