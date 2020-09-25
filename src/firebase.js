import firebase from 'firebase/app'
import  'firebase/auth'
import  'firebase/database' // using firebase DB
import  'firebase/storage' // store media filles
import {initializeApp} from 'firebase/firestore';

const config = {
  apiKey: "AIzaSyAVu9q9DLL3YJXGYWMTi1VCRWy3DXln42M",
  authDomain: "react-slack-clone-c4dbe.firebaseapp.com",
  databaseURL: "https://react-slack-clone-c4dbe.firebaseio.com",
  projectId: "react-slack-clone-c4dbe",
  storageBucket: "react-slack-clone-c4dbe.appspot.com",
  messagingSenderId: "126336463867",
  appId: "1:126336463867:web:3b69833ef51480c5fb515e",
  measurementId: "G-9MTJVRRR9M"
};
  // Initialize Firebase
  

firebase.initializeApp(config);

export default firebase; // make it available for other parts of  our app