// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWGm73bjOSoLOkWopJJAXl6yc-k0JWGs0",
  authDomain: "ai-trip-planner-b5405.firebaseapp.com",
  projectId: "ai-trip-planner-b5405",
  storageBucket: "ai-trip-planner-b5405.firebasestorage.app",
  messagingSenderId: "827456779859",
  appId: "1:827456779859:web:cdc838d7d1d2b353dff8a6",
  measurementId: "G-BGZT4NL79L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);

export const modifyDocument = async (collection, documentId, data) => {
  try {
    await updateDoc(doc(db, collection, documentId), data);
    console.log("Document modified successfully!");
  } catch (error) {
    console.error("Error modifying document: ", error);
  }
};

