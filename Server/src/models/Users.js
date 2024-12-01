//Users collection 

import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true, index: true},
    password: {type: String, required: true},
});

//Users collection, exporting so reachable to db calls
//Creating model with mongoose
export const UserModel = mongoose.model("users", UserSchema);