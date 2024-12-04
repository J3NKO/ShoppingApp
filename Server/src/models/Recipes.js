import mongoose from "mongoose";


const RecipeSchema = new mongoose.schema({

    name : {type: String,
        required : true
    },
    userOwner : {

        type : mongoose.Schema.Types.ObjectId,
        //this refers to the Users collection
        ref : "users",
        required : true

    },
    ingredients : [{

        type: String,
        required : true,
        IsVeg : Boolean,
        Fibre : String


    }], 
    instructions: {
        type: String, 
        required : true
    },
    totalFibre : {
        type : String
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

    }


});

export const RecipeModel = mongoose.model("recipes", RecipeSchema);