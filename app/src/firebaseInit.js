import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBGvnyrCxh4ZuDOvt1xkPorH_f9BLJg1ro",
    authDomain: "telia-test-85fc0.firebaseapp.com",
    databaseURL: "https://telia-test-85fc0.firebaseio.com",
    projectId: "telia-test-85fc0",
    storageBucket: "gs://telia-test-85fc0.appspot.com/",
    messagingSenderId: "555140950096"
};

const Firebase = firebase.initializeApp(config);

export default Firebase;