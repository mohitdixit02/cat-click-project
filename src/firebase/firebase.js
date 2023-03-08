import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";

//Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL4a_Xs41GGm4M0jUUOaIGcdnzBid2a9I",
  authDomain: "cat-click-project.firebaseapp.com",
  projectId: "cat-click-project",
  storageBucket: "cat-click-project.appspot.com",
  messagingSenderId: "112585174515",
  appId: "1:112585174515:web:b5bc6be53f5c89ee5f7686",
  databaseURL:"https://cat-click-project-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;