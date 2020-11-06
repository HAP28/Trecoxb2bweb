var firebaseConfig = {
    apiKey: "AIzaSyBtDws3qsD5G7za-yQZsdM7sw6pQac_B04",
    authDomain: "trecox-ed1bf.firebaseapp.com",
    databaseURL: "https://trecox-ed1bf.firebaseio.com",
    projectId: "trecox-ed1bf",
    storageBucket: "trecox-ed1bf.appspot.com",
    messagingSenderId: "1093903555653",
    appId: "1:1093903555653:web:98fc37108b75e08aa9d72c",
    measurementId: "G-7GCC8D01GL"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  
var auth = firebase.auth();

  function signup(){
    var email = document.getElementById('company_email');
    var pass = document.getElementById('company_pass');

    auth.createUserWithEmailAndPassword(email.value, pass.value).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage + ' ' + errorCode);
    });
    alert("signed up");
  }

  function login(){
    var email = document.getElementById('company_email');
    var pass = document.getElementById('company_pass');

    auth.signInWithEmailAndPassword(email.value, pass.value)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage + ' ' + errorCode);
    });
  }

  function signout(){
    auth.signOut();
    alert("signed out");
  }

  auth.onAuthStateChanged(function(user){
      if(user){
          var email = user.email;
          alert('Active user ' + email);
      document.getElementById('form').action = './dashboard.html';
      } else{
          alert('No active use \nPlease login');
      }
  });