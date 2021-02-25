$(document).ready(function(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var uid = user.uid;
          var phoneNumber = user.phoneNumber;
          var providerData = user.providerData;
          user.getIdToken().then(function(accessToken) {
            $('#user').text(displayName);
          });
          console.log(displayName);
          firebase.database().ref('users/'+displayName).once('value').then(function(snapshot){
            if(snapshot.hasChild('products')){
              alert('product exist');
            } else{
              $('#category').text('Please add atleast one product');
            }
          });

        }
    }, function(error) {
        console.log(error);
    });
});