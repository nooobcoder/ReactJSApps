import firebase from "firebase";

const firebaseConfig = firebase.initializeApp({
	apiKey: "AIzaSyCPvDROu6y2JSZkDVcnTZBD9agu_bCCxYI",
	authDomain: "messenger-clone-react-c5f12.firebaseapp.com",
	projectId: "messenger-clone-react-c5f12",
	storageBucket: "messenger-clone-react-c5f12.appspot.com",
	messagingSenderId: "359900805414",
	appId: "1:359900805414:web:5ef36c648ab9441b55e9e7",
});
const db = firebaseConfig.firestore();
export default db;
