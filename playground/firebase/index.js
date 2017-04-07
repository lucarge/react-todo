import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCxLY-sPnwvwTRhpUKgL_L-vpCMb4SlCJg",
  authDomain: "lucarge-todo-app.firebaseapp.com",
  databaseURL: "https://lucarge-todo-app.firebaseio.com",
  projectId: "lucarge-todo-app",
  storageBucket: "lucarge-todo-app.appspot.com",
  messagingSenderId: "380439166692"
};
firebase.initializeApp(config);

var firebaseRef = firebase.database().ref();

firebaseRef.set({
  app: {
    name: 'Todo App',
    version: '1.0.0'
  },
  isRunning: true,
  user: {
    name: 'Luca',
    age: 22
  }
});

// firebaseRef.update({
//   isRunning: false,
//   'app/name': 'Todo Application' // Multi-path update
// });

// firebaseRef.child('app').update({
//   name: 'Todo Application'
// });

// firebaseRef.child('app/name').remove();

// firebaseRef.child('app').update({
//   version: '2.0.0',
//   name: null // this removes name completely
// });

// firebaseRef.child('app').once('value').then((snapshot) => {
//   console.log('Got entire database', snapshot.key, snapshot.val());
// }, (e) => console.log('Unable to fetch value', e));

var logData = (snapshot) => {
  console.log('Got value', snapshot.key, snapshot.val());
};

// firebaseRef.on('value', logData);

// firebaseRef.off(logData);

// firebaseRef.update({isRunning: false});

// firebaseRef.child('user').on('value', logData);

// firebaseRef.child('user').update({name: 'Andrew'});
// firebaseRef.child('app').update({name: 'Something Else'});

var notesRef = firebaseRef.child('notes');

notesRef.on('child_added', logData);
notesRef.on('child_changed', logData);
notesRef.on('child_removed', logData);

var newNoteRef = notesRef.push({
  text: 'Walk the dog!'
});