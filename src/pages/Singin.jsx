import React from "react";
import Header from "../comp/Header";
import Footer from "../comp/Footer";
import { Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./singin.css";

const Singin = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [ressPassword, setressPassword] = useState("");
  const [hasEroor, sethasEroor] = useState(false);
  const [firebaseEroor, setfirebaseEroor] = useState("");
  const [showSendEmail, setshowSendEmail] = useState(false);
  const [showForm, setshowForm] = useState("");
  return (
    <>
      <Helmet>
        <title>singin Page</title>
        <meta name="description" content="singin" />
      </Helmet>
      <Header />
      <main>
        <form className={`forgot-password ${showForm}`}>
          <div
            onClick={() => {
              setshowForm("");
            }}
            className="close"
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
          <input onChange={(eo) => {
              setressPassword(eo.target.value);
            }} type="email" placeholder="Email:" required />
          <button
            onClick={(eo) => {
              eo.preventDefault();
            
              sendPasswordResetEmail(auth, ressPassword)
                .then(() => {
                  setshowSendEmail(true);
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  // ..
                });
            }}
          >
            Reste Email
          </button>
          {showSendEmail && (
            <p>plase check your email to reset your password.</p>
          )}
        </form>

        <form>
          <input
            onChange={(eo) => {
              setemail(eo.target.value);
            }}
            type="email"
            placeholder="Email:"
            required
          />
          <input
            onChange={(eo) => {
              setpassword(eo.target.value);
            }}
            type="password"
            placeholder="Password:"
            required
          />
          <button
            onClick={(eo) => {
              eo.preventDefault();
              signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  //Signed in
                  const user = userCredential.user;
                  navigate("/");
                })
                .catch((error) => {
                  const errorCode = error.code;
                  sethasEroor(true);
                  switch (errorCode) {
                    case "auth/invalid-email":
                      setfirebaseEroor("email wrong");
                      break;
                    case "auth/user-not-found":
                      setfirebaseEroor("email wrong");
                      break;
                    case "auth/wrong-password":
                      setfirebaseEroor("password wrong");
                      break;
                    default:
                      setfirebaseEroor("please check your email & password");
                      break;
                  }
                });
            }}
          >
            sing-in
          </button>
          <p className="account">
            Don't have an account <Link to="/singup"> sing-up</Link>
          </p>
          <p
            onClick={() => {
              setshowForm("show-forgot-pass");
            }}
            className="forgpass"
          >
            forgot password
          </p>
          {hasEroor && <h2>{firebaseEroor}</h2>}
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Singin;
