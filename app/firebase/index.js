import firebase from 'firebase';

try {
  var config = {
    apiKey: "AIzaSyCxLY-sPnwvwTRhpUKgL_L-vpCMb4SlCJg",
    authDomain: "lucarge-todo-app.firebaseapp.com",
    databaseURL: "https://lucarge-todo-app.firebaseio.com",
    projectId: "lucarge-todo-app",
    storageBucket: "lucarge-todo-app.appspot.com",
    messagingSenderId: "380439166692"
  };
  firebase.initializeApp(config);
} catch(e) {

}

export var firebaseRef = firebase.database().ref();
export default firebase;