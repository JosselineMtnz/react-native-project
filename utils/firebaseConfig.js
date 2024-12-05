import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4JxD0wPlIcC7LDyk3RGNKpIUR5xnmBFA",
  authDomain: "plan-it-project-f1006.firebaseapp.com",
  projectId: "plan-it-project-f1006",
  storageBucket: "plan-it-project-f1006.appspot.app",
  messagingSenderId: "812567883564",
  appId: "1:812567883564:web:cffe7fbe01e508e61d4689",
  measurementId: "G-ZVM5R5BBE6",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);
export { auth, db };
