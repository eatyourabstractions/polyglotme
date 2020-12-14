import React from 'react'
import styled from 'styled-components'
import {useHistory} from 'react-router-dom';

const CloseLessonBtn = ({top, left}) =>{
    const history = useHistory()
    return (
        <div style={{position:'relative'}}>
            <Juice top={top} left={left} onClick={() => history.push('/Dashboard')}/>
        </div>
    )
}


const Juice = styled.div`
  width: 75px;
  height: 75px;
  box-shadow: 0px 10 10px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background:#65e603;
  left: 50%;
  top: 50%;
  margin-top: ${props => props.top};
  margin-left: ${props => props.left};
  position: absolute;
  display: block;
  z-index: 200;
  text-indent: -9999px;
  cursor: pointer;

  &:before,:after{
    content: '';
  width: 55%;
  height: 2px;
  background: #fff;
  position: absolute;
  top: 48%;
  left: 22%;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -ms-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  }
  &:after{

    -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -ms-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;

  }
  &:hover:before,:hover:after{
    -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);

  }
  

`

export default CloseLessonBtn
