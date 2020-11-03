import firebase from 'firebase';
  
var firebaseConfig = {
    apiKey: "AIzaSyB6IuDOhzpiP39Jp-Zv6asfclXpCGhBrI4",
    authDomain: "login-926f3.firebaseapp.com",
    databaseURL: "https://login-926f3.firebaseio.com",
    projectId: "login-926f3",
    storageBucket: "login-926f3.appspot.com",
    messagingSenderId: "181893105519",
    appId: "1:181893105519:web:a1eae928b18f7a0e930a9a"
};
const fire = firebase.initializeApp(firebaseConfig);

export default fire; 