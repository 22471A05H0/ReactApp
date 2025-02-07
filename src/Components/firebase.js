import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  push,
  set,
  get,
  update,
  remove,
  onValue,
} from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCiednVtWleydMeyAsWk8mj7hAIS5V6-NU",
  authDomain: "reactapp-b8a87.firebaseapp.com",
  databaseURL: "https://reactapp-b8a87-default-rtdb.firebaseio.com/", // Replace with your Realtime Database URL
  projectId: "reactapp-b8a87",
  storageBucket: "reactapp-b8a87.firebasestorage.app",
  messagingSenderId: "692130593447",
  appId: "1:692130593447:web:400f89a5399fedf4c3f982",
  measurementId: "G-F5HP9LTYWN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

export { ref, push, set, get, update, remove, onValue };
