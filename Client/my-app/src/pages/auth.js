import { useState } from "react";
import {useCookies} from "react-cookie";
//using axios rather than nodes built in API fetching
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Auth = () => {

    return <div className="auth">

        <Login></Login>
        <Register></Register>
        
    </div>
    

};


const Login = () => {

    const [username, SetUsername] = useState("");
    const [password, SetPassword] = useState("");

    //navigation hook rather than using window object/function
    const navigate = useNavigate();

    const label = "Login";

    const [_, setCookies] = useCookies(["access_token"]);

    const onSubmit = async(e) => {

        e.preventDefault();

        try{

            const response = await axios.post("http://localhost:3001/auth/login", {
                username, 
                password
            });

            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.UserID)

            navigate("/home");

        }catch(err) {

            console.error(err);

        };


    };


    return <Form onSubmit={onSubmit} label={label} username={username} SetUsername={SetUsername} 
    password={password} SetPassword={SetPassword}></Form>
     

};

const Register = () => {

    const [username, SetUsername] = useState("");
    const [password, SetPassword] = useState("");
    const label = "Register";


    const onSubmit = async (e) => {

        e.preventDefault();

        try{

            await axios.post("http://localhost:3001/auth/register", {
                username, 
                password
            });
            alert("Registration Completed! Please Login.");

            
        } catch (err){

            console.error(err);

        }
        
    }

    return <Form onSubmit={onSubmit} label={label} username={username} SetUsername={SetUsername} 
    password={password} SetPassword={SetPassword}></Form>


    };


    const Form = ({label, SetUsername, onSubmit, SetPassword}) => {

        return <div className="auth-container">
        <form onSubmit={onSubmit}>
        <h1>{label}</h1>
        <div className="form-group">
            <label htmlFor="username">Username: </label>
            <input type="text" id="username" onChange={(e) => {SetUsername(e.target.value)}}></input>
        </div>
        <div className="form-group">
            <label htmlFor="paswword">Password: </label>
            <input type="password" id="password" onChange={(e) => {SetPassword(e.target.value)}}></input>
        </div>

        <button type="submit">{label}</button>

        </form>
    </div>;

    };