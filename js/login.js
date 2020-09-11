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
 
var data = firebase.database().ref('company');
var cname,pass;

document.getElementById('submit').onclick = function(){
    cname = document.getElementById('company').value; //email
    pass = document.getElementById('company_pass').value;
    data.orderByChild('Email').equalTo(cname).on("value", function(snapshot) {
        snapshot.forEach(function(child) { 
              if(pass==snapshot.val().Password){
                  const params = (new URL(document.location)).searchParams;
                  params.set('company_name',snapshot.val().Company)
                  form.action = "./dashboard.html";
              }
         });
      });
}
