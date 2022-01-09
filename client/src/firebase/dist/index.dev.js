"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storage = exports.db = exports.auth = exports.firebaseApp = void 0;

var _app = require("firebase/app");

var _auth = require("firebase/auth");

var _firestore = require("firebase/firestore");

var _storage = require("firebase/storage");

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: 'AIzaSyBQ7BCO9c_jsLQvZxHzRh0QHW8C9gDoIkw',
  authDomain: 'gamelobby-4f59a.firebaseapp.com',
  projectId: 'gamelobby-4f59a',
  storageBucket: 'gamelobby-4f59a.appspot.com',
  messagingSenderId: '96652409608',
  appId: '1:96652409608:web:de6936227fdbcca2334abd',
  measurementId: 'G-7XMMTVS2C3'
}; // Initialize Firebase

var firebaseApp = (0, _app.initializeApp)(firebaseConfig);
exports.firebaseApp = firebaseApp;
var auth = (0, _auth.getAuth)(firebaseApp);
exports.auth = auth;
var db = (0, _firestore.getFirestore)(firebaseApp);
exports.db = db;
var storage = (0, _storage.getStorage)(firebaseApp);
exports.storage = storage;