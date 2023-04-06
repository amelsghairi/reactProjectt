import Header from "../comp/Header";
import Footer from "../comp/Footer";
import Loading from "../comp/loading";
 import { Helmet } from "react-helmet-async";
import {useEffect  } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { deleteUser } from "firebase/auth";
import {auth} from '../firebase/config';
import Moment from 'react-moment';

const Profile = () => {
  const [user, loading, error] = useAuthState(auth);

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
  
  });

  if (loading) {
    return (
      
        <Loading />
      
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (user) {
  return (
    <>
     <Helmet>
     <title>Profile</title>
        <style type="text/css">{` 
    
        main{
          flex-direction: column;
          align-items: flex-start;
          width: fit-content;
          margin: auto;

        }
      
      
        
        `}</style>
      </Helmet> 
      <Header />
      <main className="pro">
      <h6>Name:{user.displayName} </h6>
      <h6>Email:{user.email}</h6>
      <h6>   Last Sign-in :{""} 
      <Moment fromNow date={user.metadata.lastSignInTime}/>
      </h6>
      <h6>  Account Created  :{""} 
      <Moment fromNow date={user.metadata.creationTime}/>
      </h6>
      <button onClick={()=>{
        deleteUser(user).then(() => {
      console.log("User deleted")  
        }).catch((error) => {
          // An error ocurred
          // ...
        });
      }}
      className="delete">Delete account</button>
    </main>

      
      <Footer />
    </>
  );
      }
};
export default Profile;