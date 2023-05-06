import { initializeApp, } from "firebase/app";
import {signInWithEmailAndPassword,getAuth, createUserWithEmailAndPassword, onAuthStateChanged,signOut} from 'firebase/auth'
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'
import { useCallback } from "react";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBD6ixTIfAIqkkOTX8bzuyWM3sOwMqOsGg",
  authDomain: "todo-app-auth-ac3b8.firebaseapp.com",
  projectId: "todo-app-auth-ac3b8",
  storageBucket: "todo-app-auth-ac3b8.appspot.com",
  messagingSenderId: "1004854455571",
  appId: "1:1004854455571:web:aaffed6af8944eb22d7ee6"
};

// Initialize Firebase
const firebaseApp= initializeApp(firebaseConfig);
export const database=getFirestore();
export const auth=getAuth();

//user create
export const createUserDocumentFromAuth=async(userAuth,additionInformation={})=>{
  if(!userAuth) return;
  const userDocRef=doc(database,'users',userAuth.uid);
  const userSnapShot=await getDoc(userDocRef);

  if(!userSnapShot.exists()){
    const {displayName,email}=userAuth;
    const createAt=new Date();
    try{
      await setDoc(userDocRef,{
        displayName,
        email,
        createAt
      });
    }catch(error){
      console.log('error create user',error.message);
    }
  }
  return userDocRef;
}

export const createAuthUserWithEmailAndPassword=async(email,password)=>{
  if(!email || !password)return;
  return await createUserWithEmailAndPassword(auth,email,password);
};

export const signInAuthUserWithEmailAndPassword=async(email,password)=>{
  if(!email || !password)return;
  return await signInWithEmailAndPassword(auth,email,password);
}

export const signOutUser=async()=>await signOut(auth);

export const onAuthStateChangedListener=(callback)=>onAuthStateChanged(auth,callback);