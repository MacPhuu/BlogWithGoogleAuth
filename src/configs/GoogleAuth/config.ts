import exp from "constants";
import { initializeApp } from "firebase/app" ;   
import { getAuth, GoogleAuthProvider } from "firebase/auth" ;


const firebaseConfig = { 
    apiKey : "AIzaSyAXC--HnkSLNNBc3j-DzqWYsnuqvKpQLjA" , 
    authDomain : "blog-f9c81.firebaseapp.com" , 
    projectId : "blog-f9c81" , 
    storageBucket : "blog-f9c81.appspot.com" , 
    messagingSenderId : "54017454519" , 
    appId : "1:54017454519:web:ed3d6f75b36bdcb83f3832" , 
    measurementId : "G-Q13TS4C8D1" 
  };
  const app = initializeApp ( firebaseConfig );
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  export {auth,provider};