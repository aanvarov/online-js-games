// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzfMHYOVhGPTDcKSwbPHj7dhrYsDbvnNs",
  authDomain: "online-js-games.firebaseapp.com",
  projectId: "online-js-games",
  storageBucket: "online-js-games.appspot.com",
  messagingSenderId: "1025372382718",
  appId: "1:1025372382718:web:ed817482831b8e62484caf",
  measurementId: "G-D3MN0J2698",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
