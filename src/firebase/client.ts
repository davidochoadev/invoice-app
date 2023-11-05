// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const alreadyCreatedAps = getApps();
const firebaseConfig = {
   apiKey: "AIzaSyAXOzBRUUdlrzAkAnsN5KvvaxDcejs93gk",
   authDomain: "astro-invoice-app.firebaseapp.com",
   projectId: "astro-invoice-app",
   storageBucket: "astro-invoice-app.appspot.com",
   messagingSenderId: "356855041762",
   appId: "1:356855041762:web:fa0b4ae04ce3764ab398bb",
   measurementId: "G-K6PDVE93SR"
};

// Initialize Firebase


export const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);