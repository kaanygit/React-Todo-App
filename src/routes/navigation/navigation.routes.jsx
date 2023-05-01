import { Fragment,useContext,useEffect,useState } from "react"
import { Link, Outlet } from "react-router-dom"
import { signOutUser } from '../../utils/firebase/firebase'
import {UserContext}  from '../../context/user.context'


const Navigation=()=>{
    const {currentUser}=useContext(UserContext);
    const [isSignedIn, setIsSignedIn] = useState(false);

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
    }

    return(
        <Fragment>
            <div>NAV BAR</div>
            {
                currentUser?<button onClick={handleSignOut}>SignOut</button>
                :<div>buton gelcek signotu</div>
            }
            <Outlet/>
        </Fragment>
    )
}

export default Navigation