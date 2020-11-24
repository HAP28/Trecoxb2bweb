// var firebaseConfig = {
//     apiKey: "AIzaSyBtDws3qsD5G7za-yQZsdM7sw6pQac_B04",
//     authDomain: "trecox-ed1bf.firebaseapp.com",
//     databaseURL: "https://trecox-ed1bf.firebaseio.com",
//     projectId: "trecox-ed1bf",
//     storageBucket: "trecox-ed1bf.appspot.com",
//     messagingSenderId: "1093903555653",
//     appId: "1:1093903555653:web:98fc37108b75e08aa9d72c",
//     measurementId: "G-7GCC8D01GL"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

  // var auth = firebase.auth();

  auth.onAuthStateChanged(function(user){
    if(user){
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
        // window.location = './sign.html';
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