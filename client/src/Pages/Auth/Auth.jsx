import React, { useState, useContext} from "react";
import { BiCart } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom"; // Add this import
import classes from "./signup.module.css";
import { auth } from "../../Utility/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import {ClipLoader} from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false
  });
  const [{ user}, dispatch] = useContext(DataContext);
  const navigate = useNavigate()



  // console .log("user", user);


  const authhandler = (e) => {
    e.preventDefault();
    console.log("e.target.name", e.target.name);
    if (e.target.name === "login") {
      setLoading({...loading, signIn: true })
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log("userCredential", userCredential);
            dispatch({
                type: Type.SET_USER,
                user: userCredential.user
            });
            setLoading({...loading, signIn: false })
            navigate("/");
        }).catch((err) => {
            setError(err.message);
            setLoading({...loading, signIn: false })
        });

  } else{
    setLoading({...loading, signUp: true })
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      
         console.log("userCredential", userCredential);
         dispatch({
             type: Type.SET_USER,
             user: userCredential.user
         });
         setLoading({...loading, signUp: false })
         navigate("/");
        }).catch((err) => {
            setError(err.message);
            setLoading({...loading, signUp: false })
        });
  }
}
  return (
    <section className={classes.fixed}>
   <Link to="/" className={classes.logo_container}>
  <div className={classes.logo_box}>
    <BiCart size={22} color="white" />
  </div>
  <div className={classes.logo_text}>
    <span className={classes.logo_shop}>Shop</span>
    <span className={classes.logo_hub}>Hub</span>
    <div className={classes.logo_sub}>STORE</div>
  </div>
</Link>
    {/* //{form } */}
    <div className={classes.login_container}>
        <h1>Sign In</h1>
        <form action="">
            <div>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" />
            </div>
            <button type="submit"
             onClick={authhandler}
              name="login"
             className={classes.login_button}>{
              loading.signIn ? <ClipLoader color="#53aaf7" size={15}></ClipLoader> :(
                "sign In"
              )}
              </button>
        </form>
        <p>Signing in your agree to the ShopHub conditons of use &
             sale. Please see our Privacy Policy, our Cookies Notice and our
             Interest-Based Ads Notice. </p>
             <button type="submit"
              onClick={authhandler}
              name="SignUP"
              className={classes.create_account_button}>{
              loading.signUp ? <ClipLoader color="#53aaf7" size={15}></ClipLoader> :(
                "Create your ShopHub account"
              )}</button>
              

              {
                error && <small style={{paddingTop: "5px", color: "red"}}>{error} </small>
              }
    </div>

</section>
  );
}

export default Auth;