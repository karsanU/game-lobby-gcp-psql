// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBQ7BCO9c_jsLQvZxHzRh0QHW8C9gDoIkw',
  authDomain: 'gamelobby-4f59a.firebaseapp.com',
  projectId: 'gamelobby-4f59a',
  storageBucket: 'gamelobby-4f59a.appspot.com',
  messagingSenderId: '96652409608',
  appId: '1:96652409608:web:de6936227fdbcca2334abd',
  measurementId: 'G-7XMMTVS2C3',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
