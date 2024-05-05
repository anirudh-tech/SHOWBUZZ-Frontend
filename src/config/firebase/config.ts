import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDes4X1vUGXMIJ1RgHpxOXwoqXAuh45Gv0",
    authDomain: "fir-5b4b9.firebaseapp.com",
    projectId: "fir-5b4b9",
    storageBucket: "fir-5b4b9.appspot.com",
    messagingSenderId: "982051708649",
    appId: "1:982051708649:web:77caa084e30d9e260dda78",
    measurementId: "G-LE19PMC01K"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

