const firebaseConfig = {
    apiKey: "AIzaSyD355J7ZQlttwU2QFP5oHACMq3yRryDh2Q",
    authDomain: "newproject-da7c7.firebaseapp.com",
    projectId: "newproject-da7c7",
    storageBucket: "newproject-da7c7.appspot.com",
    messagingSenderId: "261880518754",
    appId: "1:261880518754:web:2762727ee8c36fd63c593b"
  };

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var provider = new firebase.auth.GoogleAuthProvider();
var storage = firebase.app().storage("gs://newproject-da7c7.appspot.com");


