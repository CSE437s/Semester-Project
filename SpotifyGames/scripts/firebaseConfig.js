import { initializeApp } from 'firebase/app';

import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";

import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase
export const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'spotify-games.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'spotify-games',
  storageBucket: 'spotify-games.appspot.com',
  messagingSenderId: '16243974718',
  appId: '1:16243974718:web:d69ba35a2d588a91d9276f',
  measurementId: 'G-V06PHVMN3L',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app, AsyncStorage);
export {auth};
// const analytics = getAnalytics(app);

// Returns user credential if successful login, otherwise returns respective error code from Firebase
// output formatted as {user:user,  errorcode: errorCode, errorMessage:errorMessage}
export async function signInFirebase(email, password) {
  let response;
  try {
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password)

    const user = userCredential.user;
    response = { user: user, errorcode: undefined, errorMessage: undefined }
    console.log(user)
    // await save("user", JSON.stringify(user))
    alert("logged in!")
  }
  catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    response = { user: undefined, errorcode: errorCode, errorMessage: errorMessage }
    console.log(errorCode, errorMessage)
    alert("error logging in")

  };
  return response;
}

export async function signUpFirebase(email, password) {
  let response
  try {
    
    const userCredential = createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;
    response = { user: user, errorcode: undefined, errorMessage: undefined }
    console.log(user)
    alert("registered successfully!")

  }

  catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    response = { user: undefined, errorcode: errorCode, errorMessage: errorMessage }
    console.log(errorCode, errorMessage)
    alert("error registering")
  };

  return response
}

export async function signOutFirebase() {
  try {
    
    const res = await signOut(auth);
    alert("signout successful!");
  }
  catch (error) {
    alert("signout unsuccessful");
  }
}


export const getAuthStateChangeFirebase = (setIsLoggedIn) => {
  try {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return unsubscribe;
  }
  catch (error) {
    console.log("unable to create isLoggedIn event listener")
    return () => false;
  }
}