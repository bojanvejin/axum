import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLM4t7y9xzkEve_NnxNIakUYrOuf7OyPY",
  authDomain: "axum-online-academy.firebaseapp.com",
  projectId: "axum-online-academy",
  storageBucket: "axum-online-academy.appspot.com",
  messagingSenderId: "715985817766",
  appId: "1:715985817766:web:e226587e12171da1d2e467",
  measurementId: "G-Z4258BB753"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

console.log('Firebase initialized:', app ? 'Yes' : 'No');