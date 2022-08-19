// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {
  getFirestore,
  getDocs,
  addDoc,
  collection,
  doc,
  deleteDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const logInWithEmailAndPassword = async (email, password, callback) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    callback('Email oder Passwort falsch');
  }
};
export const logout = () => {
  signOut(auth);
};
export const getChangelogs = async () => {
  let changelogs = [];
  const querySnapshot = await getDocs(collection(firestore, 'changelogs'));
  for (let i = 0; i < querySnapshot.docs.length; i++) {
    const data = querySnapshot.docs[i].data();
    changelogs.push({
      id: querySnapshot.docs[i].id,
      version: data.version,
      items: data.items,
      date: data.date,
    });
  }
  return changelogs;
};
export const addChangelog = async (version, items, callback) => {
  try {
    await addDoc(collection(firestore, 'changelogs'), {
      version: version,
      items: items,
      date: Date.now(),
    });
    callback(null);
  } catch (error) {
    callback(error);
  }
};
export const deleteChangelog = async (changelog, callback) => {
  try {
    const docRef = doc(firestore, 'changelogs', changelog.id);
    await deleteDoc(docRef);
    callback(null);
  } catch (error) {
    callback(error);
  }
};
