import React, { useState,useEffect,Fragment } from "react"
import { Link, Outlet } from "react-router-dom"
import {useContext} from 'react';
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase";
import SignIn from "../../components/sign-in/sign.component";
import SignUp from "../../components/sign-up/signup.components";
import Todo from "../../components/todo/todo.components";


const Home=()=>{
    const {currentUser}=useContext(UserContext);
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(()=>{
        if(currentUser){
            setIsSignedIn(true);
            localStorage.setItem('isSignIn',JSON.stringify(true))
            // localStorage.setItem('isSignIn',true);
        }else{
            setIsSignedIn(false);
            localStorage.setItem('isSignIn',JSON.stringify(false));
            localStorage.removeItem("isSignedIn");
        }
    },[currentUser])

    const handleSignOut=()=>{
        signOutUser();
        setIsSignedIn(false);
    }
    return(
        <Fragment>
            {currentUser?
                <Fragment>
                    <button onClick={handleSignOut}>SignOut</button>
                    <div>
                        <Link to='/dashboard'>dashboard</Link>
                    </div>
                    <Link to='/todo'>todo</Link>
                </Fragment>
                    :
                    <div className='authentication-container'>
                        <Link to='/dashboard'>Deneme</Link>                    
                        <SignIn/>
                        <SignUp/>
                    </div> 
                }
            <div>home</div>
            <Outlet/>    
        </Fragment>
    )
}

export default Home