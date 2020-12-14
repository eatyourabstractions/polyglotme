import React,{useContext} from "react";

import SignIn from "./SignIn";
import SignUp from "./SignUp";


import {useFirestoreUser} from './UserProvider'

import {auth} from '../services/firebase'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function Application() {
  const user = useFirestoreUser();
  console.log('fullname',user)
  return (
        user ?
        <ProfilePage/>
      :
        <Router>
            <Route path="/signUp"> 
                <SignUp  />
            </Route>
            <Route exact path="/"> 
                 <SignIn  />
            </Route>
            <Route path="/ProfilePage"> 
                <ProfilePage  />
       </Route>
        </Router>

  );
}
export default Application;


  function ProfilePage() {
    const user = useFirestoreUser();
 
    console.log('current user', user)
    return (
    <>
      <h2>{`ProfilePage: ${user ? user.email : 'bollocks'}`}</h2>
      <button onClick={() => auth.signOut()} >logout</button>
    </>
    );
  }