import Header from "../comp/Header";
import Footer from "../comp/Footer";
import Loading from "../comp/loading";
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../firebase/config';
import {sendEmailVerification } from "firebase/auth";
import { Link } from "react-router-dom";
 import { Helmet } from "react-helmet-async";

const Home = () => {
  const [user, loading ] = useAuthState(auth);



  if(loading) {
    return (
    <Loading />  
    
    );
  }

  if(!user){
    return(
      <>
      <Helmet>
       <title>HOME Page</title>
       <meta name="description" content="HOMEEEEEEEEEEEE" />
     </Helmet> 

     <Header />

         <main>
     <p className='pls'>
   Do you  have an account <Link to="/singin"> sing-in</Link>
 </p>
 </main>

 
     <Footer />
   </>
    );
  }
  if(user){

    if(user.emailVerified){
      return (
        <>
           <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet> 
    
          <Header />
    
        
      <main> 
         <p>welcome: {user.displayName}</p>   
           
          
           </main>
        
      
          <Footer />
        </>

    );
   }


    if(!user.emailVerified){
      return (
        <>
           <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet> 
    
          <Header />
    
        
      <main> 
        {""}
         <p>welcome: {user.displayName}</p>   
           
          <p> we send  you an email to verify your Account</p>
          <button onClick={()=>{
          sendEmailVerification(auth.currentUser)
              .then(()=>{
                // Email verification sent!
                // ...
              });
          }}
        
          className="delete">send again</button>
           </main>
        
      
          <Footer />
        </>
      );  
    }
    
  }

};

export default Home;



