import "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4K7mz9jmwV3h0jfLEtGAIu1DwCj85bR8",
  authDomain: "otp-app-demo-978d5.firebaseapp.com",
  projectId: "otp-app-demo-978d5",
  storageBucket: "otp-app-demo-978d5.appspot.com",
  messagingSenderId: "24976081435",
  appId: "1:24976081435:web:ad983aa86a6971b21b6ebe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;