import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, TwitterAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


export const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  };
  

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

export const signInWithTwitter = () => signInWithPopup(auth, twitterProvider);

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export const signInWithFacebook = () => signInWithPopup(auth, facebookProvider);

export {auth, db, app};


