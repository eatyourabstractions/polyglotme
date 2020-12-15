import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";



  // Your web app's Firebase configuration
  const  firebaseConfig = {
   
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();

export const recordProgress = async (uid,level, myPogress) =>{

  const usersCollection = db.collection("users")
  const userSnapshot = await usersCollection.doc(uid).get()
  const user = userSnapshot.data()
  console.log('recordProgress',  user[level])
  await db.collection("users").doc(uid).set({
    ...user,
    [level]:  myPogress,
  })
}

export const downloadProgress = async (uid,level) =>{

  const usersCollection = db.collection("users")
  const userSnapshot = await usersCollection.doc(uid).get()
  const user = userSnapshot.data()
  console.log('downloadProgress',  user[level])
  return user[level]
}

