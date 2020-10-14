import { initializeApp, database } from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var firebaseConfig = {
  apiKey: "AIzaSyBtDws3qsD5G7za-yQZsdM7sw6pQac_B04",
  authDomain: "trecox-ed1bf.firebaseapp.com",
  databaseURL: "https://trecox-ed1bf.firebaseio.com", //https://trecox-ed1bf.firebaseio.com/
  projectId: "trecox-ed1bf",
  storageBucket: "trecox-ed1bf.appspot.com",
  messagingSenderId: "1093903555653",
  appId: "1:1093903555653:web:98fc37108b75e08aa9d72c",
  measurementId: "G-7GCC8D01GL"
};
// Initialize Firebase
initializeApp(firebaseConfig);

// var dataP = firebase.database();
var db = database();
var ref1 = db.ref.child('company');
var cname,pass;

document.getElementById('submit').onclick = function(e){
    cname = document.getElementById('company').value; //email
    pass = document.getElementById('company_pass').value;
    ref1.orderByChild('email').equalTo(cname).on('value',function(snapshot){
      console.log(snapshot.val());
      snapshot.forEach(function(data) {
          console.log(data.key);
      });
    });
}

