import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyDokgfrd300nVAUd2mSIea0nbXv-C-HPcc",
	authDomain: "todoapp-48f22.firebaseapp.com",
	projectId: "todoapp-48f22",
	storageBucket: "todoapp-48f22.appspot.com",
	messagingSenderId: "727011393379",
	appId: "1:727011393379:web:b83c50d1ed2805e3395d56",
});
const db = firebaseApp.firestore();

export default db;
