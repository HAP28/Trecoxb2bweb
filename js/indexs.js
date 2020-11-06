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

  var email = document.getElementById('company_email') ;
  var pass = document.getElementById('company_pass');
  var button = document.getElementById('register');

  button.onclick = function(){
    alert(email.value);
    firebase.auth().createUserWithEmailAndPassword(email.value,pass.value).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        window.alert('Message' + errorMessage);
    });
  }
