import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCc454rqSjsv4e0wNV2-qwYYJcPxZqbTAg",
  authDomain: "form-login-caab5.firebaseapp.com",
  projectId: "form-login-caab5",
  storageBucket: "form-login-caab5.appspot.com",
  messagingSenderId: "335036394148",
  appId: "1:335036394148:web:42fa945b344ccbd5f95431",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
