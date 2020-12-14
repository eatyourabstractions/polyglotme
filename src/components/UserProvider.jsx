import React,{ createContext, useState, useEffect, useContext } from 'react'

import {auth, db} from '../services/firebase'

export const UserContext = createContext(null);



function UserProvider({children}) {
  const [firestoreUser, setFirestoreUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(async (authState) => {
      console.log('loggedin', authState)
      if(authState){
      const usersCollection = db.collection("users")
      const userSnapshot = await usersCollection.doc(authState.uid).get()
      const user = userSnapshot.data()
      setFirestoreUser({ ...user, uid: authState.uid })
    } else {
      setFirestoreUser(null)
    }
      
    })
  }, [])

    return (
        <UserContext.Provider value={firestoreUser}>
        {children}
      </UserContext.Provider>
    )
}

export default UserProvider

export const useFirestoreUser = () => {
  return useContext(UserContext)
}
