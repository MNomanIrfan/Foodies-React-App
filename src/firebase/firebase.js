import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

//this config is being used for both development and production environment. Though, it is a best practice creating a second project and have two configs: one for production (prodConfig) and another for development (devConfig), so you choose the config based on the environment.

const firebaseConfig = {
  apiKey: "AIzaSyA0lffzj9JsEdwZor1Kgv9nm93AJy_xHXY",
  authDomain: "admin-noman.firebaseapp.com",
  databaseURL: "https://admin-noman.firebaseio.com",
  projectId: "admin-noman",
  storageBucket: "admin-noman.appspot.com",
  messagingSenderId: "686406452678",
  appId: "1:686406452678:web:61642284501992f7"
};

if (!firebase.apps.length) {
  //initializing with the config object
 
  firebase.initializeApp(firebaseConfig);
}

//separting database API and authentication
const db = firebase.database();
const auth = firebase.auth();

const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { db, auth, facebookProvider };
