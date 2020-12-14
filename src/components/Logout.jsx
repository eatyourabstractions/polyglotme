import React from 'react'
import styled from 'styled-components'
import {useDispatch} from 'react-redux'
import {logout} from '../redux/actions'


const Logout = () =>{
   const dispatch = useDispatch()
    return(
        <Btn onClick={() => dispatch(logout())}>Hasta la vista</Btn>
    )
}


const Btn = styled.button`
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
export default Logout
