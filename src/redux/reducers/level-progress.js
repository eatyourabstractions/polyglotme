

import {auth, db} from '../../services/firebase';


const initialState = {
  currentUser: null,
  lastUpdatedLevel: 0,
  level1: {
    name: 'Basic 1',
    image:'/images/mustafa01.png',
    progress: 0,
    progressStep: 100 / 3,
    
  },
  level2: {
    name: 'Basic 2',
    image:'/images/cato.png',
    progress: 0,
    progressStep: 100 / 2,
   
  },
  level3: {
    name: 'Phrases',
    image:'/images/kvn.png',
    progress: 0,
    progressStep: 100 / 4,
    
  },
  level4: {
    name: 'Places',
    image:'/images/nadia01.png',
    progress: 0,
    progressStep: 100 / 4,
    
  },
  level5: {
    name: 'Careers',
    image:'/images/professor01.png',
    progress: 0,
    progressStep: 100 / 4,
    
  },
  level6: {
    name: 'Food',
    image:'/images/bear01.png',
    progress: 0,
    progressStep: 100 / 4,
    
  },
  level7: {
    name: 'Animals',
    image:'/images/owl01.png',
    progress: 0,
    progressStep: 100 / 4,
    
  },
  level8: {
    name: 'TV shows',
    image:'/images/mooncake.png',
    progress: 0,
    progressStep: 100 / 4,
    
  },
  level9: {
    name: 'conversation',
    image:'/images/guy01.png',
    progress: 0,
    progressStep: 100 / 4,
    
  },
};

const recordProgress = async (st, action) =>{
  await st.db.collection("users").doc(st.currUser.uid).set({
    progress: st[action.level].progress + st[action.level].progressStep
  })
}

const myReducer =  (state = initialState, action) =>{
  switch (action.type) {
    case "DATA_RECEIVED":
        console.log("data received")
      return {
        ...state,
      };
      
      case "SET_CURRENT_USER":
        console.log("SET CURRENT USER")
      return {
        ...state,
        currentUser: action.userState
      };
      case "UPDATE_CURRENT_USER":
        console.log("UPDATE_CURRENT_USER")
      return {
        ...state,
        currentUser: {
          ...action.data,
          uid: state.currentUser.uid
        }
      };
      case "LOGOUT":
        console.log("login out")
        auth.signOut()
      return {
        ...state,
        currentUser: null,
      };
      case "SET_LAST_UPDATED_LEVEL":
        console.log("SET_LAST_UPDATED_LEVEL")
        
      return {
        ...state,
        lastUpdatedLevel: action.data,
      };
      case "SYNCHRONIZE":
        console.log("SYNCHRONIZE")
        
      return {
        ...state,
        [action.data.level]: {
          ...state[action.data.level],
          progress: action.data.progress,
        },
      };
      
      case "UPDATE_LEVEL_PROGRESS":
        console.log(`update level ${action.level} progress by ${state[action.level].progressStep}`)
       
      return {
        ...state,
        [action.level]:{
          ...state[action.level],
          progress: state[action.level].progress + state[action.level].progressStep
        },
        lastUpdatedLevel: action.level
      };
    
    default: {
      return state;
    }
  }
}

export default myReducer;