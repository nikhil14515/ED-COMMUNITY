import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD4sTwZmvZzPW00HHEShaZfzLey8yExtc4",
  authDomain: "ed-community-16402.firebaseapp.com",
  projectId: "ed-community-16402",
  storageBucket: "ed-community-16402.appspot.com",
  messagingSenderId: "1038157688823",
  appId: "1:1038157688823:web:1fe59ccf20a0179d3d88f2",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);
export const storage = getStorage(app);
