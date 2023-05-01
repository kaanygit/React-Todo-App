import { useState } from "react";
import {createAuthUserWithEmailAndPassword,createUserDocumentFromAuth} from '../../utils/firebase/firebase'

const defaultFormSubs={
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}

const SignUp=()=>{
    const [formFields,setFormFields]=useState(defaultFormSubs);
    const {displayName,email,password,confirmPassword}=formFields;
    const resetFormFields=()=>{setFormFields(defaultFormSubs)};
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(password !==confirmPassword){
            alert('parolalar eş değil tekrar dene ');
            return;
        }
        try{
            const {user}=await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user,{displayName});
            resetFormFields(); 
        }catch(error){
            if(error.code==='auth/email-already-in-use'){
                alert('baska bir email giriniz');
            }else{
                console.log('hatanın kodu',error.code);
            }
        }
    }
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormFields({...formFields,[name]:value});
    };
    console.log(formFields);


    return(
        <div className='sign-up-container'>
            <h2>Don't have an account ?</h2>
            <span>Sign up with yout e-mail and password</span>
            <form onSubmit={handleSubmit}>
                <label htmlFor="displayName">Display Name</label>
                <input placeholder="Display Name" type='text' required onChange={handleChange} name="displayName" value={displayName}/>
              
                <label htmlFor="email">Display Name</label>
                <input placeholder="Email" type="email" required onChange={handleChange} name="email" value={email}/>

                <label htmlFor="password">Display Name</label>
                <input placeholder="Password" type='password' required onChange={handleChange} name="password" value={password}/>

                <label htmlFor="confirmPassword">Display Name</label>
                <input placeholder="Confirm Password" type='password' required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                <button type="submit" >Sign Up</button>
            </form>
        </div>
    )
}
export default SignUp;