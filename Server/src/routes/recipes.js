import { RecipeModel } from "../models/Recipes.js";
import express from "express";
import mongoose from "mongoose";

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

    try{

        const response = await RecipeModel.create({});//get all recipes
        res.json(response);


    }catch(err){

        res.json(err);

    }
});


export {router as RecipeRouter};