import {signInAuthUserWithEmailAndPassword,createAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase'
import { useState ,useContext} from 'react';
import { UserContext } from '../../context/user.context';
import { json } from 'react-router-dom';

const defaultFormSubs={
    email:'',
    password:''
}

const SignIn=()=>{
    const [formFiels,setFormFiels]=useState(defaultFormSubs);
    const {email,password}=formFiels;
    const resetFormFields=()=>{setFormFiels(defaultFormSubs)};

    const [girisYaps,setGirisYaps]=useState(false);


    const {currentUser}=useContext(UserContext);
    const [userOnline,setUserOnline]=useState(false);


    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response=await signInAuthUserWithEmailAndPassword(email,password);
            console.log(response);
            resetFormFields();
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':alert('Yanlış Parola Veya Email !');break
                case 'auth/user-not-found':alert('kullanıcı bulunamadı ! ');break
                default:console.log(error); 
            }
        }
    }
    const handlerChange =(e)=>{
        const{name,value}=e.target;
        setFormFiels({...formFiels,[name]:value});
    }

    console.log(formFiels);
    return(
        <div className='sign-up-container'>
            <h2>Already have an account ?</h2>
            <span>Sign in with yout e-mail and password</span>
            <form onSubmit={handleSubmit}>
                <input label="Email" type="email" required onChange={handlerChange} name="email" value={email}/>
                <input label="Password" type='password' required onChange={handlerChange} name="password" value={password}/>
                <div className='buttons-container'>
                    <button type="submit" >Sign In</button>
                </div>
            </form>
        </div>
    )
}

export default SignIn