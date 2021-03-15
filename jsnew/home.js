var product = []
var products;
function createDiv(product){
  for(var i in product){
    // console.log(product[i].description);
    var d=document.createElement("div");
    var d1=document.createElement("div");
    var d2=document.createElement("div");
    var d3=document.createElement("div");
    var d4=document.createElement("div");
    var h5=document.createElement("h5");
    var p1=document.createElement("p");
    var p2=document.createElement("p");
    var small = document.createElement('small');
    var img=document.createElement("img");
    d.className = 'card my-3';
    d1.className = 'row no-gutters';
    d2.className = 'col-md-4';
    d3.className = 'col-md-8';
    d4.className = 'card-body';
    h5.className = 'card-title'
    p1.className = 'card-text'
    p2.className = 'card-text'
    small.className = 'text-muted'
    img.className = 'card-img';
    document.getElementById('productpg').appendChild(d);
    d.appendChild(d1)
    d1.appendChild(d2)
    d2.appendChild(img)
    d1.appendChild(d3)
    d3.appendChild(d4)
    d4.appendChild(h5)
    d4.appendChild(p1)
    d4.appendChild(p2)
    p2.appendChild(small)
    d.style.maxWidth = '1040px';
    d.style.height = 'auto';
    img.src = "./images/about.png"
    h5.textContent = product[i].productName
    p1.textContent = 'Mrp: ' + product[i].mrp + ' Price: ' + product[i].price
    small.textContent = product[i].description
  }
}

$('#side-dashboard').click(() => {
  $('#side-dashboard').addClass('active_menu_link');
  $('#side-pro-man').removeClass('active_menu_link');
  $('#side-cus-man').removeClass('active_menu_link');
  $('#products').hide();
  $('#side-products').removeClass('active_menu_link');
  $('#dashboardDiv').show();
  $('#pro-man').hide();
  $('#cus-man').hide();
});

$('#side-pro-man').click(() => {
  $('#pro-man').show();
  $('#dashboardDiv').hide();
  $('#cus-man').hide();
  $('#products').hide();
  $('#side-products').removeClass('active_menu_link');
  $('#side-pro-man').addClass('active_menu_link');
  $('#side-dashboard').removeClass('active_menu_link');
  $('#side-cus-man').removeClass('active_menu_link');
});

$('#side-cus-man').click(() => {
  $('#pro-man').hide();
  $('#dashboardDiv').hide();
  $('#cus-man').show();
  $('#products').hide();
  $('#side-products').removeClass('active_menu_link');
  $('#side-cus-man').addClass('active_menu_link');
  $('#side-pro-man').removeClass('active_menu_link');
  $('#side-dashboard').removeClass('active_menu_link');
});

$('#side-products').click(() => {
  for (let index = 0; index < 3; index++) {
  createDiv()
  }
    
  $('#pro-man').hide();
  $('#dashboardDiv').hide();
  $('#cus-man').hide();
  $('#products').show();
  $('#side-products').addClass('active_menu_link');
  $('#side-cus-man').removeClass('active_menu_link');
  $('#side-pro-man').removeClass('active_menu_link');
  $('#side-dashboard').removeClass('active_menu_link');
});

$('#addCategory').click(() =>{
  if(($('#subCategory').val() == 'Select' && $('#catName').val() == '') || ($('#subCategory').val() != 'Select' && $('#catName').val() != '')){
    alert('select or add new category');
  }else{
    if($('#subCategory').val() == 'Select')
    {
      var category = $('#catName').val();
    } else{
      var category = $('#subCategory').val();
    }
    firebase.database().ref('users/'+ localStorage.getItem('user') + '/subCategory/' + category + '/' + $('#proName').val()).set({
      productName: $('#proName').val(),
      price: $('#price').val(),
      mrp: $('#mrp').val(),
      description: $('#description').val()
    });
    alert('product added');
    $('#proName').val('');
    $('#price').val('');
    $('#mrp').val('');
    $('#description').val('');
    $('#catName').val('');
    $('#subCategory').val('Select');
  }
});
  auth.onAuthStateChanged(function(user){
    if(user){

      console.log(user.displayName);
      localStorage.setItem('user',user.displayName);

      // checck for the first time form
	  firebase.database().ref('users/').once('value').then(function(snapshot){
        if(snapshot.hasChild(user.displayName)){
          console.log('already exist');
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
      
      $('#product-user').text(user.displayName);
      
      // product management & products code
      firebase.database().ref('users/'+ user.displayName).once('value').then(function(snapshot){
        if(snapshot.hasChild('subCategory')){
          firebase.database().ref('users/'+ user.displayName + '/subCategory').on("value",(snapshot) => {
            $('#subCategory')
            .find('option')
            .remove()
            .end()
            $('#subCategory').append(new Option('Select', 'Select'));              
            console.log(Object.keys(snapshot.val()));
            Object.keys(snapshot.val()).forEach(element => {
              $('#subCategory').append(new Option(element, element));              
            });
            products = snapshot.val();
            console.log(products);
            for(var pro in products){
              var obj = products[pro];
              for(var x in obj){
                product.push(obj[x]);
              }
            }
            console.log(product);
            if($('#subCategorySort').val() == 'All'){
              createDiv(product)
            }
          });
        } else{
          $('#product-status').text('Add Your First Category of Product.');
        }
      });

      //products sorting code
      firebase.database().ref('users/'+ user.displayName).once('value').then(function(snapshot){
        if(snapshot.hasChild('subCategory')){
          firebase.database().ref('users/'+ user.displayName + '/subCategory').on("value",(snapshot) => {
            $('#subCategorySort')
            .find('option')
            .remove()
            .end()
            $('#subCategorySort').append(new Option('All', 'All'));              
            console.log(Object.keys(snapshot.val()));
            Object.keys(snapshot.val()).forEach(element => {
              $('#subCategorySort').append(new Option(element, element));              
            });
          });
        }
      });

      $('#subCategorySort').on('change', function() {
        for(var e in products){
          if(e == this.value){
            $('#productpg').html('');
            console.log(products[e]);
            createDiv(products[e])
          }
        }
        if($('#subCategorySort').val() == 'All'){
          $('#productpg').html('');
          createDiv(product)
        }
        // alert( this.value );
      });

        console.log('Active user ' + user.displayName);
        document.title = user.displayName;
        document.getElementById('user').innerHTML = user.displayName;
        document.getElementById('cmp_name').innerHTML = user.displayName;
        document.getElementById('logo').src = user.photoURL;

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

// logout button
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