import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAtTj3lvy5u59MLFeIShd0NRelwqQtcies",
  authDomain: "boepartners-141c8.firebaseapp.com",
  databaseURL: "https://boepartners-141c8-default-rtdb.firebaseio.com",
  projectId: "boepartners-141c8",
  storageBucket: "boepartners-141c8.appspot.com",
  messagingSenderId: "457775958984",
  appId: "1:457775958984:web:2cd5c964a6722f096e4efd",
  measurementId: "G-R3BG2BDKWE"
};


const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp, "gs://boepartners-141c8.appspot.com");

export { storage, firebaseApp }; 