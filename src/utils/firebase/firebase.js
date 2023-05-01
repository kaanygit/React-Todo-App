import { initializeApp, } from "firebase/app";
import {signInWithEmailAndPassword,getAuth, createUserWithEmailAndPassword, onAuthStateChanged,signOut} from 'firebase/auth'
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'
import { useCallback } from "react";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {

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