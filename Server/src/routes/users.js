import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from "../models/Users.js";


//initialising express routing - /auth route
const router = express.Router();

//post route for registering (sending log in data to db)
router.post("/register", async (req, res)=>{

    const {username, password} = req.body;

    //console.log("Searching for user:", username);

    const user = await UserModel.findOne({username});
    
    //console.log("Request body:", req.body);

    if(user){

      return res.json({message: "Username already exists!"});

    }
    /*if (!user) {
        return res.status(404).json({ message: "User not found" });
      }*/
    

    //hashing of password 
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username, password : hashedPassword
    });

    newUser.save();

        
    res.json({message: "Account Registered Successfully!"});

});


//Post route for logging in
router.post("/login", async (req, res)=>{

  const {username, password} = req.body;
  const user = await UserModel.findOne({username});

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      //using bcrypt to compare passwords and return boolean result
      const isPassValid = await bcrypt.compare(password, user.password);

      if(!isPassValid){

        return res.json({message: "Username or Password is Incorrect"}); 

      }

      //json web token
      const token = jwt.sign({id: user._id}, process.env.SECRET);

      res.json({token, userID: user._id})

});


//exporting and renaming router for users
export {router as userRouter};