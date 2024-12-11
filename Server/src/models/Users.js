//Users collection 

import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true, index: true},
    password: {type: String, required: true},
    savedRecipes: [{type: mongoose.Schema.Types.ObjectId, ref: "recipes"}],//Saved Recipes Foreign key
    shoppingList: [{type: mongoose.Schema.Types.ObjectId, ref: "recipes"}]
});

//Users collection, exporting so reachable to db calls
//Creating model with mongoose
export const UserModel = mongoose.model("users", UserSchema);