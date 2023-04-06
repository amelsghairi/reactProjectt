import React from 'react'
import { Link, NavLink } from "react-router-dom";
import './Header.css'
import "../theme.css";
import {useContext } from "react";
 import ThemeContext from "../theme/themeContext";
 import { useAuthState } from 'react-firebase-hooks/auth';
 import {auth} from '../firebase/config';
 import { signOut } from "firebase/auth"

function Header() {
  const [user ] = useAuthState(auth);
  const { theme ,toggleTheme} = useContext(ThemeContext);
  return (
    <div className='myheader'>
  
        <header className="hide-when-mobile ali ">
    <h1><Link to ="/">Amel.dev</Link></h1>
    <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-moon"
        ></i>
        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-sun"
        ></i>
      
    <ul className="flex">
      {!user && <li className="main-list">
        <NavLink className="main-link" to="/singin"> Singin </NavLink>
      </li>
      }
        
  
        {!user &&  <li className="main-list">
        <NavLink className="main-link" to="/singup"> Singup </NavLink>
    
      </li>      }
        
      {user && <li onClick={() => {signOut(auth).then(() => {

     console.log('Sign-out successful.')  
}).catch((error) => {
  // An error happened.
});  }}  className="main-list">
        <NavLink className="main-link" to="/singin"> Singout </NavLink>
      </li>
      }
      {user &&  <li className="main-list">
        <NavLink className="main-link" to="/About"> About </NavLink>
    
      </li> }
      
      {user && <li className="main-list">
        <NavLink className="main-link" to="/Porfile"> Portfile  </NavLink>
        
          </li>
      
}

    
    
  
    
    </ul>
  </header>


    </div>
  )
}

export default Header
