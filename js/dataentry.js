  // Your web app's Firebase configuration
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
//   firebase.analytics();


//   function writeUserData(userId, name, email, imageUrl) {
//     firebase.database().ref('users/' + userId).set({
//       username: name,
//       email: email,
//       profile_picture : imageUrl
//     });
//   }

document.getElementById('form').addEventListener('submit',submitForm);

function submitForm(e){

    e.preventDefault();
    var cname = getValue('company_name');
    var email = getValue('company_email');
    var pass = getValue('company_pass');
    var loc = getValue('company_location');
    var contact = getValue('company_contact');
    console.log(cname);
}

function getValue(id){
    return document.getElementById(id).value;
}
