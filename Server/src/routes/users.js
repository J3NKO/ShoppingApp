import express from 'express';
import bcrytp from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from "../models/Users.js";


//initialising express routing - /auth route
const router = express.Router();

//post route for registering (sending log in data to db)
router.post("/register", async (req, res)=>{

    const {username, password} = req.body;

    console.log("Searching for user:", username);

    const user = await UserModel.find();
    
    console.log("Request body:", req.body);



    if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

    res.json(user);

});


//Post route for logging in
router.post("/login");


//exporting and renaming router for users
export {router as userRouter};