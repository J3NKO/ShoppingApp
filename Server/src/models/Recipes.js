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
        name: {
            type: String, 
            required: true
        },
        IsVeg: {
            type: Boolean,
            required: true
        },
        Fibre: {
            type: Number,
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

// Search functionality index
RecipeSchema.index({ name: 'text', instructions: 'text', ingredients: 'text' });

export const RecipeModel = mongoose.model("recipes", RecipeSchema);