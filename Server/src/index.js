import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'; //mongodb ORM
import dotenv from 'dotenv'; //env credneitals

import { userRouter } from './routes/users.js';



dotenv.config();


const app = express();

//middleware set up
app.use(express.json());//convert data to json from client

app.use(cors());// for api requests across origins

// /auth endpoint will point towards the user file.js
app.use("/auth", userRouter);

//conecting mongoose db
// template string: mongoose.connect("mongodb+srv://callumjenko:<db_password>@shoppingapp.gbqto.mongodb.net/?retryWrites=true&w=majority&appName=ShoppingApp")
//mongoose.connect(`mongodb+srv://callumjenko:${process.env.DB_PASSWORD}@shoppingapp.gbqto.mongodb.net/?retryWrites=true&w=majority&appName=ShoppingApp`)
mongoose.connect(`mongodb+srv://callumjenko:${process.env.DB_PASSWORD}@shoppingapp.gbqto.mongodb.net/?retryWrites=true&w=majority&appName=ShoppingApp`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));
  


//hosting backend on port 3001
app.listen(3001, 
    //callback function which runs if list method is called without error
    ()=> console.log("SERVER START UP SUCCESSFUL"));