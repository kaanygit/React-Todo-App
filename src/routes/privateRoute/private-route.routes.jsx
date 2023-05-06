import { UserContext } from "../../context/user.context";
import {Route, Navigate, Outlet } from "react-router-dom";
import { Component, useContext ,useEffect, useState} from "react";
import Todo from "../../components/todo/todo.components";

const PrivateRoute=()=>{
    const {currentUser}=useContext(UserContext);

    useEffect(() => {
        const isSignedIn = JSON.parse(localStorage.getItem("isSignedIn"));
        if (currentUser && !isSignedIn) {
          localStorage.setItem("isSignedIn", JSON.stringify(true));
          console.log('1');
        }else if(!currentUser && isSignedIn) {
          const storageSignIn = JSON.parse(localStorage.getItem("isSignIn"));
          
          // localStorage.removeItem("isSignedIn");
          console.log('2');
        }
      }, [currentUser]);

      const isSignedIn = JSON.parse(localStorage.getItem("isSignedIn"));
    
    return isSignedIn ? <Outlet />:<Navigate to='/'  />
}

export default PrivateRoute;

    // const [isSignedIn, setIsSignedIn] = useState(false);

    // useEffect(() => {
    //     const storageSignIn = JSON.parse(localStorage.getItem("isSignIn"));
    //     if (storageSignIn) {
    //       localStorage.setItem("isSignedIn", JSON.stringify(true));
    //       setIsSignedIn(true);
    //       console.log(isSignedIn);
    //     } else {
    //         const storageSignIn2 = JSON.parse(localStorage.getItem("isSignIn"));
    //         if(storageSignIn2===false){
    //             localStorage.setItem("isSignedIn", JSON.stringify(false));
    //             setIsSignedIn(false);
    //         }
    //     }  
    //   }, []);