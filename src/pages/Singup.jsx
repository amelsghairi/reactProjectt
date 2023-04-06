import React from 'react';
import Header from "../comp/Header";
import Footer from "../comp/Footer";
import Loading from "../comp/loading";
import { Link } from "react-router-dom";
import { useState }  from "react";
import { createUserWithEmailAndPassword,updateProfile, sendEmailVerification } from "firebase/auth";
import {auth} from '../firebase/config';
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

const Singup = () => {
  const navigate = useNavigate();
 const [email, setemail] = useState("");
 const [password, setpassword] = useState("");
 const [userName, setuserName] = useState("");
 const [hasEroor, sethasEroor] = useState(false);
 const [firebaseEroor, setfirebaseEroor] = useState("");
 const [user, loading ] = useAuthState(auth);

//LODING
//NOT SIGN-IN
//VERIFICATION POUR EMAIL
//SIGN6IN VERIFIED EMAIL => NAVIGATE


useEffect(() => {
  if (user) {
    if (user.emailVerified) {
      navigate("/");
    }
  }
});


if(loading) {
  return (
    <Loading />
      
  );
}


if(user){
  if(!user.emailVerified){
    return (
      <div>
<Header />
        <main>
          <p> we send  you an email to verify your Account</p>
          <button className="delete">send again</button>
        </main>
        <Footer />
      </div>
    );
    }
}







if(!user){
  return (
    <>
    <Helmet>
        <title>Signup </title>
        <meta name="description" content="Signup" />
      </Helmet>
      <Header />
      <main>
        <form action="">
        <p style={{fontSize:"20px",marginBottom:"22px",color:'white'}}> Create a new account </p>
        <input onChange={(eo)=>{
    setuserName(eo.target.value);
  }} 
  type="text"  placeholder='username:' required/>
  <input onChange={(eo)=>{
    setemail(eo.target.value);
  }} 
  type="email"  placeholder='Email:' required/>
  <input onChange={(eo)=>{
    setpassword(eo.target.value);
  }} type="password"placeholder='Password:'required />

  <button onClick={(eo)=>{
  eo.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 

        const user = userCredential.user;
        sendEmailVerification(auth.currentUser)
        .then(() => {
          // Email verification sent!
          // ...
        });
        updateProfile(auth.currentUser, {
          displayName: userName,
        })
        .then(() => {
          navigate("/")
          
        }).catch((error) => {
        console.log(error.code)
          // ...
        });
    
      })
      .catch((error) => {
        const errorCode = error.code;
        sethasEroor(true);
    switch (errorCode) {
      case "auth/invalid-email":
        setfirebaseEroor("email wrong")
        break;
      case "auth/user-not-found":
        setfirebaseEroor("email wrong")
        break;
        case "auth/wrong-password":
          setfirebaseEroor("password wrong")
          break;
      default:
        setfirebaseEroor("please check your email & password")
        break;
    }
      });
  }}>sing-up</button>
  <p className='account'>
    Do you  have an account <Link to="/singin"> sing-in</Link>
  </p>
  {hasEroor && <h2>{firebaseEroor}</h2>}
</form></main>

      <Footer />
    </>
  );
}

  
};

export default Singup;