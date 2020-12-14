import React,{useState} from "react";

import {FormWrapper, Heading, Form, Input, InputButton} from './FormParts';

import {auth} from '../services/firebase';


//TODO: decide if use an 'action for login in
const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const signInWithEmailAndPasswordHandler =  (event,email, password) => {
        
                event.preventDefault();
                 auth.signInWithEmailAndPassword(email, password)
                 .catch(error => {
                    setError("Error signing in with password and email!");
                    console.error("Error signing in with password and email", error);
                  });
    };
    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;

        if(name === 'userEmail') {
            setEmail(value);
        }
        else if(name === 'userPassword'){
          setPassword(value);
        }
    };

  return (
        <FormWrapper>
            <Heading>Login</Heading>
            <Form>
            <Input
                type="text"
                name={'userEmail'}
                placeholder={'email@goesHere.com'}
                value={email}
                onChange={(e) => onChangeHandler(e)}
                borderColor="none"
            />
            <Input
                type="password"
                name={'userPassword'}
                placeholder={'please enter a secure password'}
                value={password}
                onChange={(e) => onChangeHandler(e)}
                borderColor="none"
            />
            <InputButton type="submit" id="submit" onClick={ (event) => {signInWithEmailAndPasswordHandler(event, email, password)}} />
            </Form>
        </FormWrapper>
        )
};

export default SignIn;
