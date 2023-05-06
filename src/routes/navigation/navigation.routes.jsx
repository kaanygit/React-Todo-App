import { Fragment,useContext,useEffect,useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { signOutUser } from '../../utils/firebase/firebase';
import {UserContext}  from '../../context/user.context';

import './navigation.styles.css';


const Navigation=()=>{
    const {currentUser}=useContext(UserContext);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const first=()=>{
        localStorage.removeItem('isSignedIn');
        console.log('obje çalışıyor');
    }
    useEffect(()=>{
        if(currentUser){
            setIsSignedIn(true);
            localStorage.setItem('isSignIn',JSON.stringify(true))
        }else{
            setIsSignedIn(false);
            localStorage.setItem('isSignIn',JSON.stringify(false));
        }
    },[currentUser])
    const handleSignOut=()=>{
        signOutUser();
        setIsSignedIn(false);
        first();
    }

    return(
        <Fragment>
            {currentUser?
            <header>
                <span className="web-name"><h1>Navbar</h1></span>
                <nav>
                    <ul className="nav-bar">
                        <li className="nav-link">deneme</li>
                        <li className="nav-link">deneme2</li>
                        <li className="nav-link">deneme3</li>
                        <li className="nav-link"><span onClick={handleSignOut}>SignOut</span></li>
                    </ul>
                </nav>
            </header>
            :null
            }
            <Outlet/>
        </Fragment>
    )
}

export default Navigation