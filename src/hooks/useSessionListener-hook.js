import { useEffect} from 'react'
import { useDispatch } from "react-redux";
import {setCurrentUser, updateCurrentUser, updateLevelProgress} from '../redux/actions';
import {auth, db} from '../services/firebase'

export function useSessionListener() {
    // const [firestoreUser, setFirestoreUser] = useState(null)
    let dispatch = useDispatch()
  
    useEffect(() => {
      auth.onAuthStateChanged(async (authState) => {
        console.log('loggedin', authState)
        if(authState){
        const usersCollection = db.collection("users")
        const userSnapshot = await usersCollection.doc(authState.uid).get()
        const user = userSnapshot.data()
        usersCollection.doc(authState.uid)
          .onSnapshot((doc) =>{
            const data = doc.data()
            console.log('collection data', data)
            dispatch(updateCurrentUser(data))
          })
        // setFirestoreUser({ ...user, uid: authState.uid })
        dispatch(setCurrentUser({ ...user, uid: authState.uid }))
      } else {
        // setFirestoreUser(null)
        dispatch(setCurrentUser(null))
      }
        
      })
    }, [])
  
      // return firestoreUser
  }

  