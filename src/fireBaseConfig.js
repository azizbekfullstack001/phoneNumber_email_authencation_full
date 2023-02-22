import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyAGIlG4FQmOHHDxfctQgolUeCI87M29teU",
  authDomain: "test-91597.firebaseapp.com",
  projectId: "test-91597",
  storageBucket: "test-91597.appspot.com",
  messagingSenderId: "594202823337",
  appId: "1:594202823337:web:01f34ee4d52a87208737b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
export const auth = getAuth(app)