import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGXPM4WSWppeAnmCVr15M1QeqiB6EQPdY",
  authDomain: "asiloapp-3b58d.firebaseapp.com",
  projectId: "asiloapp-3b58d",
  storageBucket: "asiloapp-3b58d.appspot.com",
  messagingSenderId: "666223153937",
  appId: "1:666223153937:web:984647034dae4b6c08f2b0"
};


const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);
export { auth, db };
