import mongoose from "mongoose";


const RecipeSchema = new mongoose.Schema({

    name : {type: String,
        required : true
    },
    userOwner : {

        type : mongoose.Schema.Types.ObjectId,
        //this refers to the Users collection
        ref : "users",
        required : true

    },
    ingredients: [
    {
        type: {
            type: String, 
            required: true
        },
        IsVeg: {
            type: Boolean,
            required: true
        },
        Fibre: {
            type: String,
            required: true
        }
    }
    ], 
    instructions: {
        
        type: String, 
        required : true
    },
    totalFibre : {

        type : Number
    },
    cookingTime : {

        type: Number,
        required : true
    },
    prepTime :{

        type : Number,
        required : true

    },
    vegCount : {

        type : Number,
        required : true

    },
    imageURL : {

        type : String,
        required : true        

    }


});

export const RecipeModel = mongoose.model("recipes", RecipeSchema);