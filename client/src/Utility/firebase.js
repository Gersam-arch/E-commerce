import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore"
import "firebase/compat/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCqa4S_VlZ45cY1rowqRDO9wpLsgUilxE",
  authDomain: "shop-hub-b94d5.firebaseapp.com",
  projectId: "shop-hub-b94d5",
  storageBucket: "shop-hub-b94d5.firebasestorage.app",
  messagingSenderId: "82159620940",
  appId: "1:82159620940:web:e3d3fb261186035bdab5e9"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();