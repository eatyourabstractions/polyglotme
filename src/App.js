
import React,{useEffect, useState} from 'react';
import './App.css';

import { BrowserRouter as Router, Route, useHistory} from "react-router-dom";

import Dashboard from './components/Dashboard'

import styled from 'styled-components'

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";



import { useSelector, useDispatch } from "react-redux";
import {useSessionListener} from './hooks/useSessionListener-hook';

import {logout} from './redux/actions'




function App() {
    useSessionListener();
    const dispatch = useDispatch()
    
  
  return (
    
   <Router>
      <Authenticate />
     <div className="App">
      
      
      <Dashboard/>    
        
      </div> 
     
   </Router>
  
      ) 


}

const Logout = styled.button`
  position: relative;
  display: block;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background:#65e603;
  color: whitesmoke;
  font-size:25px;
  border: none;
  left: 20px;
  top: 10px;
`;



export default App;


function Authenticate() {
  const user = useSelector((state) => state.currentUser)
  const history = useHistory()
  const nonAuthenticatedUrl = history.location.pathname;
  console.log('nonAuthenticatedUrl', nonAuthenticatedUrl)
    useEffect(()=> {
        if(user){
          history.push('/Dashboard')
        } else if(nonAuthenticatedUrl === '/Dashboard' || !['/','/signUp'].includes(nonAuthenticatedUrl)){
          history.push('/')
        } else{
          history.push(nonAuthenticatedUrl)
        }
    },[user, nonAuthenticatedUrl])
 
  return (
      <>
      <Route path="/signUp"> 
              <SignUp  />
          </Route>
          <Route exact path="/"> 
              <SignIn  />
          </Route> 
      </>
  );
}











