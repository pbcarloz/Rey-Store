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
 // takes 3 arguments database, collection, unique Identifier //////
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    // If user data does not exist?
     // create / set the document with the data from userAuth in my collection
    if (!userSnapshot.exists()) {
        const {displayName, email } = userAuth;
        const createdAt = new Date (); 

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error){
            console.log('Error creating the user', error.message);
        }
    }
    // user data exist?
    return userDocRef;
  }


