import React, { useState,useEffect,Fragment } from "react"
import { Link, Outlet } from "react-router-dom"
import {useContext} from 'react';
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase";
import SignIn from "../../components/sign-in/sign.component";
import SignUp from "../../components/sign-up/signup.components";
import './home.styles.css';
import DeveloperImage from '../../assets/developer.jpg'

const Home=()=>{
    const {currentUser}=useContext(UserContext);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [formActive,setFormActive]=useState('false')

    useEffect(()=>{
        if(currentUser){
            setIsSignedIn(true);
            localStorage.setItem('isSignIn',JSON.stringify(true));
            localStorage.setItem('isSignedIn',JSON.stringify(true));
        }else{
            setIsSignedIn(false);
            localStorage.setItem('isSignIn',JSON.stringify(false));
        }
    },[currentUser])
    useEffect(()=>{

    },[])

    const handleSignOut=()=>{
        signOutUser();
        setIsSignedIn(false);
    }
    const handleFormActive=()=>{
        setFormActive(!formActive);
    }
    return(
        <Fragment>
            {currentUser ?
                <Fragment>
                    <div className="application">
                        <Link to='/dashboard' className="grid-item">dashboard</Link>
                        <Link to='/todo' className="grid-item">todo</Link>
                    </div>
                </Fragment>
                    :
                    <Fragment>
                        <div className="form-container">
                            <div className='authentication-container'>
                                <img className="image" src={DeveloperImage}/>
                                <div className={`form sign-in-form ${formActive?'active-in':''}`}>
                                <SignIn/>
                                <span><button className="button-handle"  onClick={handleFormActive}>Sign Up</button></span>
                                </div>
                                <div className={`form sign-in-form ${!formActive?'active-up':''}`}>
                                <SignUp/>
                                <span><button className="button-handle" onClick={handleFormActive}>SignIn</button></span>
                                </div>
                            </div> 
                        </div>
                    </Fragment>
                }
            <Outlet/>    
        </Fragment>
    )
}

export default Home