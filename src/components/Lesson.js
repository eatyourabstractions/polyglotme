import React,{useState, useEffect} from 'react';

import { useHistory, useParams } from "react-router-dom";

import styled from 'styled-components';

import { DragDropContext  } from 'react-beautiful-dnd';

import { v4 as uuidv4 } from 'uuid';

import MyList from './MyLists'

import reorder from './reorder'

import ProgressBar from '@ramonak/react-progress-bar';

import {range, zip, arraysMatch, nextItem, prevItem, getRandom} from './utils'

import { useDispatch, useSelector } from "react-redux";

import {dataReceived, updateLevelProgress} from '../redux/actions'

import CloseLessonBtn from './CloseLessonBtn'

const addAndScramble = (arr1, arr2) =>{
  const arr3 = arr1.concat(arr2)
  return arr3.sort(() => Math.random() - 0.5)

}

function Lesson() {
    const [english, setEnglish] = useState(false)
    const [spanish, setSpanish] = useState([])
    const [completed, setCompleted] = useState(0)
    const [step, setStep] = useState(0)
    const [stepTracker, setTracker] = useState(null)
    const [remaining, setRemaining] = useState(null)
    const [randomWords, setRandomWords] = useState([])
    const [barColor, setBarColor] = useState(false)
    const [toggle, setToggle] = useState(false)

    let history = useHistory();
    const dispatch = useDispatch();
    
    const initialState = {quoteMap :{
      characters: [],
      otherCharacters: []
    }}
    const [state, setState] = useState(initialState)
  
    let { quantity, level } = useParams();
   


    
    
   
    
  useEffect(() => {
   
    fetch(`/getSomePhrases/${quantity}`)
      .then(res =>{
       return res.json()
      })
      .then(json => {
        console.log(json)
        dispatch(dataReceived())
        console.log('randomWords', json.extraWords)
        const firstScramble = json.extraWords.map(rw => ({name: rw, id: uuidv4()}))
        setRandomWords(firstScramble)
        let englishPhrasesArr = [];
        let spanishPhrasesArr = []

        for(const elem of json.data){
          englishPhrasesArr.push(elem.english)
          const spanishTokens = elem.spanish.split(" ").map(w => ({name: w, id: uuidv4()}) )
          console.log('answer',elem.spanish)
          spanishPhrasesArr.push(spanishTokens)
        }
        console.log('spanishPhrasesArr',spanishPhrasesArr)
        
        
        const zippedElems = zip(englishPhrasesArr, spanishPhrasesArr)

        console.log('zippedElems', zippedElems)
        setRemaining(zippedElems)
       const stepSize = 100 / json.data.length
       const tracker = range(1, json.data.length).map(n => n * stepSize)
       tracker.unshift(0)
       console.log('tracker', tracker)
      
        setTracker(tracker)
        const newSpanish = spanishPhrasesArr[step];
        setEnglish(englishPhrasesArr[step])
        
        console.log('newspanish', newSpanish)
        setSpanish(newSpanish)
        const newChar = [...state.quoteMap.characters]
       
        const news = {
          ...state,
          quoteMap:{
            characters: newChar,
            otherCharacters: [...newSpanish, ...getRandom(firstScramble, 4)].sort(() => Math.random() - 0.5)
          }
        }
        setState(news)
       
      })
     
  },[])
    
  function onDragEnd(result){
    if (!result.destination) return;
    console.log('result', result)
    const ans = reorder({
      quoteMap: state.quoteMap,
      source: result.source,
      destination: result.destination,
    })
    console.log('ans', ans.result)
    setState(s => ({...s, quoteMap: ans.result}))

  }

  const updateLesson = (newInfo) =>{
    setEnglish(newInfo[0])
    setSpanish(newInfo[1])
 
    const news = {
      ...state,
      quoteMap:{
        characters: [],
        otherCharacters: addAndScramble(newInfo[1], getRandom(randomWords, 5))
      }
    }
    setState(news)
  }

  const handleProgress = (fst, snd) =>{
    setToggle(false)
    if(arraysMatch(fst, snd)){
    // stepTracker & remaining
    const progress = nextItem(stepTracker, step)
    setCompleted(progress)
    
    if(progress === 100){
      
      history.push("/Dashboard");
      dispatch(updateLevelProgress(level))
    } else {
      updateLesson(remaining[step + 1])
      setStep(step + 1)
    }
 
    } else {
      const progress = prevItem(stepTracker, step)
      if(progress !== undefined){
        setCompleted(progress)
        updateLesson(remaining[step - 1])
        setStep(step - 1)
      } else {
       
        updateLesson(remaining[Math.floor(Math.random() * remaining.length)])
      }
    }
   }
   const CallBottomBar = (fst, snd) =>{
     const theyMatch = arraysMatch(fst, snd)
     setBarColor(theyMatch)
     setToggle(true)
    //handleProgress(fst, snd)
   }

   
  return (
        <>
        <CloseLessonBtn top={'30px'} left={'-650px'}/>
          <div style={{position:'relative', height:'100vh', overflowY:'hidden'}}>
            <ProgressBar 
            completed={completed}
            bgcolor="#65e603"
            labelColor="#65e603"
            />
            
        <header className="App-header">
       
          <h1>{english ? english : `Final Space Characters`}</h1>
          <DragDropContext onDragEnd={onDragEnd}>
            <div style={{backgroundColor: '#2ccab3', borderRadius:'10px'}}>
              <MyList characters={state.quoteMap.characters} listId={'characters'} />
            </div>

            <MyList characters={state.quoteMap.otherCharacters} listId={'otherCharacters'}/>
          </DragDropContext>
        </header>
        
        <CheckBtn onClick={() => {
          const fst = state.quoteMap.characters.map(it =>it.name)
          const snd = spanish.map(it => it.name)
          // alert( `${arraysMatch(fst, snd) ? 'they are' : `they're not`}` )
          CallBottomBar(fst, snd)
          }}>Am I Right?</CheckBtn>  
          
          <BottomBar up={toggle} color={barColor}>
            <span>{barColor ? 'good job buddy' : 'hmm!, take a closer look and try again'}</span>
            <CheckBtn onClick={() =>{
              const thingOne = state.quoteMap.characters.map(it =>it.name)
              const thingTwo = spanish.map(it => it.name)
              handleProgress(thingOne, thingTwo)
            }}>Continue</CheckBtn>
          </BottomBar>
          </div>
        </>
        
    )
}

export default Lesson

//const CheckBtn = styled.button``;

const CheckBtn = styled.button`
  width: 125px;
  height: 80px;
  background-color:#2ccab3;
  color: whitesmoke;
  font-size: 25px;
  border-radius:10px;
  border: none;

  &:hover{
    box-shadow: 10px 10px 0px 0px rgba(0,0,0,0.75);
    -webkit-box-shadow: 10px 10px 0px 0px rgba(0,0,0,0.75);
   -moz-box-shadow: 10px 10px 0px 0px rgba(0,0,0,0.75);
  }

`;

const BottomBar = styled.div`
  display:flex;
  justify-content:space-evenly;
  align-items:center;
  width: 100vw;
  height: 200px;
  background-color: ${props => props.color ? '#65e603' : 'salmon'};
  position: absolute;
  top: ${props => props.up ? 'calc(100vh - 230px)' : '100vh'};
  font-size: 30px;
  color: whitesmoke;
  transition: 350ms;
`;

// TODO: add styling to the answer 
//TODO: add daily goal tracker screen
//TODO: add "err msg when wrong" and/or congrats msg when right
// TODO: save state when a lessson is completed


