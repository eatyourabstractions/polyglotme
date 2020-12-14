import React,{useState, useEffect} from 'react';
import { Switch, Route, useHistory} from "react-router-dom";
import styled from 'styled-components';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Lesson from './Lesson';
import { useSelector, useDispatch } from "react-redux";

import {recordProgress} from '../services/firebase'

import {setLastUpdatedLevel, synchronize} from '../redux/actions'

import InspirationQuotes from './InspirationQuotes'

import Logout from './Logout'

function Dashboard() {
    const levelState = useSelector((state) => state)
    return (
        <>
             <Route path="/lesson/:level/:quantity">
              <Lesson />
            </Route>
          
            <Route  path="/Dashboard">
            <Layout>
               <div>
                 <Logout/>
                  <LessonsWrapper>
                  <SingleLesson level={'level1'} numOfTest={'1'} levelState={levelState}/>
                    <JointLessons>
                      <SingleLesson level={'level2'} numOfTest={'3'} levelState={levelState}/>
                      <SingleLesson level={'level3'} numOfTest={'2'} levelState={levelState}/>
                    </JointLessons>
                    <SingleLesson level={'level4'} numOfTest={'3'} levelState={levelState}/>
                    <JointLessons>
                      <SingleLesson level={'level5'} numOfTest={'4'} levelState={levelState}/>
                      <SingleLesson level={'level6'} numOfTest={'2'} levelState={levelState}/>
                    </JointLessons>
                  <SingleLesson level={'level7'} numOfTest={'1'} levelState={levelState}/>
                  <JointLessons>
                      <SingleLesson level={'level8'} numOfTest={'1'} levelState={levelState}/>
                      <SingleLesson level={'level9'} numOfTest={'1'} levelState={levelState}/>
                    </JointLessons>
                  </LessonsWrapper>
               </div>
              <div style={{ position:'relative'}}>
                 
                   <InspirationQuotes/>
                 
              </div>
            </Layout>
            </Route>
  
        </>
    )
}

export default Dashboard

const Layout = styled.div`
 display: grid;
  grid-template-columns: auto auto;

`;

const ProgressProvider = ({ valueStart, valueEnd, children }) => {
    const [value, setValue] = useState(valueStart);
    useEffect(() => {
      setValue(valueEnd);
    }, [valueEnd]);
  
    return children(value);
  };
  // HACKING: FIGURING OUT HOW TO UPDATE THE PROGRESS IN FIREBASE
  const SingleLesson = ({levelState, numOfTest, level}) =>{
    let history = useHistory();
    let dispatch = useDispatch()
    const user = useSelector((st) => st.currentUser)
    

    

    console.log('singleLesson levelstate', levelState)

    
    const handleClick = () => history.push(`/lesson/${level}/${numOfTest}`)
    const newProgress = level === levelState.lastUpdatedLevel ? levelState[levelState.lastUpdatedLevel].progress : levelState[level].progress
    if(user && level === levelState.lastUpdatedLevel){ 
      console.log('singleLesson component',newProgress)
      recordProgress(user.uid, level, newProgress)
      .catch(err => console.log(err))
      dispatch(setLastUpdatedLevel(null))
      dispatch(synchronize({level: level, progress: newProgress}))
    }
    const isPrevOpen = (st,currLev) => {
      if(st === null){
        return false
      }

      if(currLev === 'level1'){
        return true
      } else{
        const prev = 'level' + (parseInt(currLev.slice(-1)) - 1);
        return st[prev] >= 100
      }
    }
    
   let lessonProgress = levelState.currentUser ? levelState.currentUser[level] : 0;
   
    
    return(
                  <div style={setAvailability(isPrevOpen(levelState.currentUser,level) ) }>
                    <div 
                     style={{width: '150px', height:'150px', marginLeft:'20px', marginRight:'20px', cursor:'pointer'}}
                     onClick={handleClick}>
                       <ProgressProvider valueStart={0} valueEnd={lessonProgress}>
                          {(value) => <CircularProgressbarWithChildren value={value} styles={{path:{stroke:'#65e603'}}}>
                             <Avatar>
                                <Img src={levelState[level].image} style={{margin:'15px'}}/>
                              </Avatar>
  
                              
                            </CircularProgressbarWithChildren>}
                      </ProgressProvider>
                       
                     </div>
                     <h2>{levelState[level].name}</h2>
                  </div>
    )
  }
  const setAvailability = (isOn) =>{
    const off = 
    {
      pointerEvents: 'none',
      opacity: '0.5',
      background: '#CCC',
      width: '200px',
      height: '220px',
      display: 'block',
      borderRadius:' 50% 50% 50% 50% / 60% 60% 40% 40%',
      paddingBotton: '0',
      paddingTop: '40px',
      marginLeft:'20px'
    }
    if(isOn){
      return {cursor: 'pointer'}
    } else{
      return off
    }
  }

const LessonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column
`;

const JointLessons = styled.div`
  display:flex;
  justify-content: space-between;
  flex-direction:row;
`;

const Img = styled.img`

  width: 60px;
  height: 100px;
  object-fit: cover;
  
`;

const Avatar = styled.div`
width: 150;
height: 200;
border-radius: 50%;
`;

