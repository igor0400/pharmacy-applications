import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCUzwDmXmYpIGdn9cLYPXGs04AB5vzHPbs',
  authDomain: 'pharmacy-applications.firebaseapp.com',
  databaseURL: 'https://pharmacy-applications-default-rtdb.firebaseio.com',
  projectId: 'pharmacy-applications',
  storageBucket: 'pharmacy-applications.appspot.com',
  messagingSenderId: '769847507656',
  appId: '1:769847507656:web:365fa260ae2733eb8383fd',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage };
