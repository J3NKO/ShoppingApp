import { useState } from "react";
//using axios rather than nodes built in API fetching
import axios from "axios";


export const Auth = () => {

    return <div className="auth">

        <Login></Login>
        <Register></Register>
    </div>
    

};


const Login = () => {

    const [username, SetUsername] = useState("");
    const [password, SetPassword] = useState("");

    const label = "Login";

    return <Form label={label} username={username} SetUsername={SetUsername} 
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
        <h2>{label}</h2>
        <div className="form-group">
            <label htmlFor="username">Username: </label>
            <input type="text" id="username" onChange={(e) => {SetUsername(e.target.value)}}></input>
        </div>
        <div className="form-group">
            <label htmlFor="paswword">Password: </label>
            <input type="text" id="password" onChange={(e) => {SetPassword(e.target.value)}}></input>
        </div>

        <button type="submit">{label}</button>

        </form>
    </div>;

    };