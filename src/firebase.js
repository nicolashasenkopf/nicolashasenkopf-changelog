// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAykNmnr7HiO1GgS6JicZ8r2WuVKb9Ayho',
  authDomain: 'changelog-b5fd8.firebaseapp.com',
  projectId: 'changelog-b5fd8',
  storageBucket: 'changelog-b5fd8.appspot.com',
  messagingSenderId: '535555527949',
  appId: '1:535555527949:web:78d634baa189f752e94c44',
  measurementId: 'G-5R2J81L85E',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
