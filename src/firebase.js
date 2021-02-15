import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = firebase.initializeApp({
  apiKey: "AIzaSyBh2etBvLFs4qsw69fgMOZT0RXHmVxlAac",
  authDomain: "weather-4dddd.firebaseapp.com",
  databaseURL: "https://weather-4dddd.firebaseio.com",
  projectId: "weather-4dddd",
  storageBucket: "weather-4dddd.appspot.com",
  messagingSenderId: "982882592096",
  appId: "1:982882592096:web:8df32e183b0e49a372ea05",
  measurementId: "G-9WJPLL0EPF",
});

export const auth = config.auth()
export default config;
