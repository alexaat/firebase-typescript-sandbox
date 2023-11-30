import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAuYK7NmVQTGIr4ppKKschOzfBEA6eA_jM",
    authDomain: "fir-typescript-sandbox.firebaseapp.com",
    projectId: "fir-typescript-sandbox",
    storageBucket: "fir-typescript-sandbox.appspot.com",
    messagingSenderId: "408726357822",
    appId: "1:408726357822:web:220129636bae72f39b4e6f"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
