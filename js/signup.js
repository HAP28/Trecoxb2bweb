  // Your web app's Firebase configuration
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
 

 
const form = document.getElementById('form');
const company_name = document.getElementById('company_name');
const company_email = document.getElementById('company_email');
const company_pass = document.getElementById('company_pass');
const company_confirm_pass = document.getElementById('company_confirm_pass');
const company_location = document.getElementById('company_location');
const company_contact = document.getElementById('company_contact');


function checkInputs(){
    // alert('f');
    const companyName = company_name.value.trim();
    const companyEmail = company_email.value.trim();
    const companyPass = company_pass.value.trim();
    const companyCpass = company_confirm_pass.value.trim();
    const companyLocation = company_location.value.trim();
    const companyContact = company_contact.value.trim();
    var n = 1,e = 1,p = 1,c = 1,cc = 1,cl = 1;

    if(companyName == '') {
        n = 0;
        setErrorFor(company_name, 'Company name cannot be blank');
    } else {
        n = 1;
        setSuccessFor(company_name);
    }
    if(companyEmail == '') {
        e = 0;
        setErrorFor(company_email, 'Email cannot be blank');
    } else if(!isEmail(companyEmail)) {
        e = 0;
        setErrorFor(company_email, 'Please enter valid email');
    } else {
        e = 1;
        setSuccessFor(company_email);
    }
    if(companyPass == '') {
        p = 0;
        setErrorFor(company_pass, 'Password cannot be blank');
    } else {
        p = 1;
        setSuccessFor(company_pass);
    }
    if(companyCpass == '') {
        c = 0;
        setErrorFor(company_confirm_pass, 'Email cannot be blank');
    } else if(companyCpass != companyPass) {
        c = 0;
        setErrorFor(company_confirm_pass, "Password doesn't match");
    } else {
        c = 1;
        setSuccessFor(company_confirm_pass);
    }
    if(companyContact == '') {
        cc = 0;
        setErrorFor(company_contact, 'Contact cannot be blank');
    } else {
        cc = 1;
        setSuccessFor(company_contact);
    }
    if(companyLocation == '') {
        cl = 0;
        setErrorFor(company_location, 'Location cannot be blank');
    } else {
        cl = 1;
        setSuccessFor(company_location);
    }
    if(n == 1 && e == 1 && c == 1 && cc == 1 && cl == 1 && p == 1){
        cname = document.getElementById('company_name').value;
        email = document.getElementById('company_email').value;
        contact = document.getElementById('company_contact').value;
        pass = document.getElementById('company_pass').value;
        loc = document.getElementById('company_location').value;

    firebase.database().ref('company/'+cname).set({
        Company:cname,
        Email:email,
        Password:pass,
        Contact:contact,
        Location:loc
    });
        return true;
    } else{
        return false;
    }
}

function setErrorFor(input, message) {
    const formGroup = input.parentElement;
    const small = formGroup.querySelector('small');

    small.innerText = message;
    formGroup.className = 'form-group error';
}

function setSuccessFor(input){
    const formGroup = input.parentElement;
    
    formGroup.className = 'form-group success';
}

function isEmail(email){
    return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email);
}

var cname,email,pass,loc,contact;

