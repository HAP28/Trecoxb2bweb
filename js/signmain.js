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
 
var data = firebase.database();
const company = sessionStorage.getItem('cname');
window.addEventListener('load',() => {
    // const params = (new URL(document.location)).searchParams;
    // const company = params.get('company_name');
    data.ref('company/'+company).on('value',function(snapshot){
        document.getElementById('name').innerHTML = snapshot.val().Company;
        document.getElementById('email').innerHTML = snapshot.val().Email;
        document.getElementById('location').innerHTML = snapshot.val().Location;
        document.getElementById('contact').innerHTML = snapshot.val().Contact;
        document.getElementById('title').innerHTML = 'Dashboard of '.toUpperCase() + snapshot.val().Company.toUpperCase();
      });    
});



  