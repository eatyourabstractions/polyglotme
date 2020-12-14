import React,{useState} from 'react'
import {FormWrapper, Heading, Form, Input, InputButton} from './FormParts';
import {db, auth} from '../services/firebase';


function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(null);
  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try{
        const userCredentials = await auth.createUserWithEmailAndPassword(email, password);
        console.log('userCredentials',userCredentials)
        await db.collection("users").doc(userCredentials.user.uid).set({
          email: userCredentials.user.email,
          fullName: fullName,
          createdAt: Date.now(),
          level1: 0,
          level2:0,
          level3: 0,
          level4: 0,
          level5:0,
          level6: 0,
          level7: 0,
          level8:0,
          level9: 0,
        })
      }
      catch(error){
        setError('Error Signing up with email and password');
      }
    setEmail("");
    setPassword("");
    setFullName("");
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "fullName") {
      setFullName(value);
    }
  };
   
        return (
            <FormWrapper>
                <Heading>Sign Up</Heading>
                <Form>
                <Input
                    type="text"
                    name={'fullName'}
                    placeholder={'John Doe'}
                    value={fullName}
                    onChange={(e) => onChangeHandler(e)}
                    borderColor="none"
                />
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
                <InputButton type="submit" id="submit" onClick={event => {
              createUserWithEmailAndPasswordHandler(event, email, password)}} />
                </Form>
            </FormWrapper>
            )
   
}

export default SignUp
