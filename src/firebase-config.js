import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3YnfFAzIxQTWiDu1jYiDzp47ARoG0WiY",
  authDomain: "hackathon-75356.firebaseapp.com",
  projectId: "hackathon-75356",
  storageBucket: "hackathon-75356.appspot.com",
  messagingSenderId: "1092582051281",
  appId: "1:1092582051281:web:d591ba7575c7b8755124f0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
