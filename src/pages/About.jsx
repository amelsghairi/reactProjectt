import React from 'react';
import Header from "../comp/Header";
import Footer from "../comp/Footer";
import MainContent from "../comp/MainContent";
 import { Helmet } from "react-helmet-async";
import {useEffect  } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../firebase/config';

const Html = () => {
  const [user, loading ] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
  if(!user && !loading){
    navigate("/");
  } 
  if(user){
     if(!user.emailVerified){
    navigate("/");
  }
}
  
  },);
if(user){

  if(user.emailVerified){
    return (
      <>
        <Helmet>
          <title>About Page</title>
          <meta name="description" content="About" />
        </Helmet> 
        <Header />
        <MainContent pageName="About Page" />
        <Footer />
      </>
    );
  }
}


};

export default Html;

