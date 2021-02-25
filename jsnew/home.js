


$('#products').click(() => {
  $('.main__container').hide();
  $('.product__container').show();
  $('.customer__container').hide();
  $('#products').addClass('active_link');
  $('#dashboard').removeClass('active_link');
  $('#customers').removeClass('active_link');
});

$('#dashboard').click(() => {
  $('.main__container').show();
  $('.product__container').hide();
  $('.customer__container').hide();
  $('#products').removeClass('active_link');
  $('#customers').removeClass('active_link');
  $('#dashboard').addClass('active_link');
});

$('#customers').click(() => {
  $('.main__container').hide();
  $('.product__container').hide();
  $('.customer__container').show();
  $('#customers').addClass('active_link');
  $('#dashboard').removeClass('active_link');
  $('#products').removeClass('active_link');
});

  auth.onAuthStateChanged(function(user){
    if(user){

      firebase.database().ref('users/').once('value').then(function(snapshot){
        if(snapshot.hasChild(user.displayName)){
          alert('already exist');
        } else{
          document.querySelector('.bg-modal').style.display = 'flex';
          document.querySelector('.close').addEventListener('click',function(){
          document.querySelector('.bg-modal').style.display = 'none';
          });
          
          document.getElementById('profileFormSubmit').addEventListener('click',function(){
            // console.log($(this).find(':selected').data('id'));
            var category = document.getElementById('category').value;
            var contact = document.getElementById('contact').value;
            var location = document.getElementById('location').value;
            firebase.database().ref('users/' + user.displayName).set({
              displayName: user.displayName,
              email: user.email,
              category: category,
              location: location,
              contact: contact
            });
          });
        }
      });
      

      var company = {
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        uid: user.uid,
        accessToken: user.accessToken,
        providerData: user.providerData
      }

        console.log('Active user ' + company.displayName);
        document.title = company.displayName;
        document.getElementById('user').innerHTML = company.displayName;
        document.getElementById('cmp_name').innerHTML = company.displayName;
        document.getElementById('logo').src = company.photoURL;
        document.getElementById('profile').src = company.photoURL;
    } else{
        console.log('No active use \n Please login');
        window.location = './sign.html';
    }
  });




  // apex chart json

  var _seed = 42;
  Math.random = function() {
      _seed = _seed * 16807 % 2147483647;
      return (_seed - 1) / 2147483646;
  };
  
  var options = {
      series: [{
          name: "Q",
          data: [0, 4800, 9500, null],
      },
      {
          name: "Q - 1",
          data: [0, 6500, 12000, 16000]
      },{
  
          name: "Q Target",
          data: [15500, 15500, 15500, 15500]
  
      },
  
      ],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: '',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: [' ', 'Month1', 'Month2', 'Month3'],
      }
  };

var chart = new ApexCharts(
  document.querySelector("#apex1"),
  options
);

chart.render();

function signout(){
  auth.signOut();
  alert("signed out");
  localStorage.removeItem('user');
  window.location = '../sign.html';
}


//sidebar toggle

var sidebarOpen = false;
var sidebar = document.getElementById('sidebar');
var sidebarCloseIcon = document.getElementById('sidebarIcon');

function toggleSidebar(){
  if(!sidebarOpen){
    sidebar.classList.add('sidebar_responsive');
    sidebarOpen = true;
  }
}
function closeSidebar(){
  if(sidebarOpen){
    sidebar.classList.remove('sidebar_responsive');
    sidebarOpen = false;
  }
}