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
  firebase.initializeApp(firebaseConfig);

//   firebase.auth.Auth.Persistence.LOCAL;
  document.getElementById('submit').onclick = function(){
      var email = document.getElementById('company').value; 
      
      var pass = document.getElementById('company_pass').value;
      if(email != "" && pass != ""){
            firebase.auth().signInWithEmailAndPassword(email,pass).catch(function(error){
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                  } else {
                    alert(error);
                  }
            });
      } else{
          alert('Please enter the value');
      }
  }


  document.getElementById('register').onclick = function(){
    var email = document.getElementById('company_email').value; 
    
    var pass = document.getElementById('company_pass').value;
    if(email != "" && pass != ""){
          firebase.auth().createUserWithEmailAndPassword(email,pass).catch(function(error){
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode === 'auth/wrong-password') {
                  alert('Wrong password.');
                } else {
                  alert(error);
                }
          });
    } else{
        alert('Please enter the value');
    }
}