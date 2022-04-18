import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAwZq6PrJnDSgGxUzlTVwtDZYGLPFVtSIA",
    authDomain: "crwn-clothing-db-b28f8.firebaseapp.com",
    projectId: "crwn-clothing-db-b28f8",
    storageBucket: "crwn-clothing-db-b28f8.appspot.com",
    messagingSenderId: "252359396535",
    appId: "1:252359396535:web:b6845978d2f273b0d65132"
};
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    
  }


