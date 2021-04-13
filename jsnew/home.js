var ih,ihLogo;
let count_notification = 0;
if(window.location.href.includes('#pro-man')){
  $('#pro-man').show();
  $('#dashboardDiv').hide();
  $('#cus-man').hide();
  $('#products').hide();
  $('#side-products').removeClass('active_menu_link');
  $('#side-pro-man').addClass('active_menu_link');
  $('#side-dashboard').removeClass('active_menu_link');
  $('#side-cus-man').removeClass('active_menu_link');
}
if(window.location.href.includes('#products')){
  $('#pro-man').hide();
  $('#dashboardDiv').hide();
  $('#cus-man').hide();
  $('#products').show();
  $('#side-products').addClass('active_menu_link');
  $('#side-pro-man').removeClass('active_menu_link');
  $('#side-dashboard').removeClass('active_menu_link');
  $('#side-cus-man').removeClass('active_menu_link');
}
if(window.location.href.includes('#dashboardDiv')){
  $('#pro-man').hide();
  $('#dashboardDiv').show();
  $('#cus-man').hide();
  $('#products').hide();
  $('#side-products').removeClass('active_menu_link');
  $('#side-pro-man').removeClass('active_menu_link');
  $('#side-dashboard').addClass('active_menu_link');
  $('#side-cus-man').removeClass('active_menu_link');
}
var product = []
var products;
function createDiv(product){
  $('#numOfProducts').text(product.length);
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
	var btnDelete = document.createElement("button");
	btnDelete.textContent = 'Delete';
	btnDelete.className = 'btn btn-danger';
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
    d3.appendChild(btnDelete)
    d4.appendChild(h5)
    d4.appendChild(p1)
    d4.appendChild(p2)
    p2.appendChild(small)
    d.style.maxWidth = '1040px';
    d.style.height = 'auto';
    img.src = product[i].imgUrl;
	img.style.width= '250px';
	img.style.height= '250px';
    h5.textContent = product[i].productName;
    p1.textContent = 'Mrp: ' + product[i].mrp + ' Price: ' + product[i].price;
    small.textContent = product[i].description;
	btnDelete.addEventListener('click',() => {
		deleteProduct(i);
		return false;
	});
  }
}
function deleteProduct(x){
	console.log(product[x]['description']);
	return false;
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
  } else if($('#proName').val() == ''){
  	alert('Product Name is mandatory');
  } else if($('#price').val() == ''){
	alert('Price is Required')
  } else if($('#mrp').val() == ''){
	alert('MRP is Required') 
  } else if($('#myimg').src == 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRza72o_kVyvLgPaULsX2PaKTkoIlotyw52HQ&usqp=CAU'){
  	alert('Select an image for the product')
  }
  else{
    if($('#subCategory').val() == 'Select')
    {
      var category = $('#catName').val();
    } else{
      var category = $('#subCategory').val();
    }
    ImgName = $('#proName').val();
    Price = $('#price').val();
    Mrp = $('#mrp').val();
    Description = $('#description').val();
    var uploadTask = firebase.storage().ref('Images/'+ ImgName).put(files[0]);
    
	uploadTask.on('state_changed',function(snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      document.getElementById('upProgress').style.width =  progress + "%";
    },
    function(err) {
      console.log(err);
    },
    function(){
      uploadTask.snapshot.ref.getDownloadURL().then(function(url){
        console.log(url);
        ih = url;
        console.log(ih);
        
        firebase.database().ref('users/'+ localStorage.getItem('user') + '/subCategory/' + category + '/' + ImgName).set({
          productName: ImgName,
          price: Price,
          mrp: Mrp,
          description: Description,
          imgUrl: ih
        });
        alert('product added');
		window.location.reload();
		window.location.href = './home.html#pro-man'
		$('#proName').val('');
		$('#price').val('');
		$('#mrp').val('');
		$('#description').val('');
		$('#catName').val('');
		$('#subCategory').val('Select');
		document.getElementById('myimg').src = null;
		localStorage.removeItem('url');
      });
    });
 
  }
});

  auth.onAuthStateChanged(function(user){
    if(user){

      console.log(user.displayName);
      localStorage.setItem('user',user.displayName);

      // check for the first time form
	  firebase.database().ref('users/').once('value').then(function(snapshot){
        if(snapshot.hasChild(user.displayName)){
          console.log('already exist');

      // product management & products code
      firebase.database().ref('users/'+ user.displayName).once('value').then(function(snapshot){
        document.getElementById('logo').src = snapshot.val()['logoUrl'];
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
            product = []
            for(var pro in products){
              var obj = products[pro];
              for(var x in obj){
                product.push(obj[x]);
              }
            }
            console.log(product);
            if($('#subCategorySort').val() == 'All'){
              $('#productpg').html('');
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

      //wholesaler code
      // firebase.database().ref('category_wholesalers/Stationery')
      const storageRef = firebase.storage().ref();
      var starsRef = storageRef.child('wholesaler_image/Hap');

      // Get the download URL
      starsRef.getDownloadURL()
      .then((url) => {
        document.getElementById('customerImage').src = url;
        console.log(url);
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
  });
  // notification code
      firebase.database().ref('connection_users/'+user.displayName).on("value",(snapshot) => {
        count_notification = 0
        snapshot.forEach(element => {
          // console.log(element.val()['status']);  
          if(element.val()['status'] === 'pending'){
            count_notification++;
          }          
        });
        $('#notification').text(count_notification);
        $('#notification_connection').text(count_notification);
      })

        } else{
          document.querySelector('.bg-modal').style.display = 'flex';
          document.querySelector('.close').addEventListener('click',function(){
          document.querySelector('.bg-modal').style.display = 'none';
          });
          
          document.getElementById('profileFormSubmit').addEventListener('click',function(){
            if(document.getElementById('contact').value != '' && document.getElementById('location').value != '' && document.getElementById('category').value != '0')
            {
            var category = document.getElementById('category').value;
            var contact = document.getElementById('contact').value;
            var location = document.getElementById('location').value;
            firebase.database().ref('users/' + user.displayName).set({
              displayName: user.displayName,
              email: user.email,
              category: category,
              location: location,
              contact: contact,
              logoUrl: localStorage.getItem('url')
            });
            document.getElementById('logo').src = localStorage.getItem('url');
          document.querySelector('.bg-modal').style.display = 'none';
            }
          });
        }
      });
           
      $('#product-user').text(user.displayName);

      
      // // product management & products code
      // firebase.database().ref('users/'+ user.displayName).once('value').then(function(snapshot){
      //   if(snapshot.hasChild('subCategory')){
      //     firebase.database().ref('users/'+ user.displayName + '/subCategory').on("value",(snapshot) => {
      //       $('#subCategory')
      //       .find('option')
      //       .remove()
      //       .end()
      //       $('#subCategory').append(new Option('Select', 'Select'));              
      //       console.log(Object.keys(snapshot.val()));
      //       Object.keys(snapshot.val()).forEach(element => {
      //         $('#subCategory').append(new Option(element, element));              
      //       });
      //       products = snapshot.val();
      //       console.log(products);
      //       product = []
      //       for(var pro in products){
      //         var obj = products[pro];
      //         for(var x in obj){
      //           product.push(obj[x]);
      //         }
      //       }
      //       console.log(product);
      //       if($('#subCategorySort').val() == 'All'){
      //         $('#productpg').html('');
      //         createDiv(product)
      //       }
      //     });
      //   } else{
      //     $('#product-status').text('Add Your First Category of Product.');
      //   }
      // });

      // //products sorting code
      // firebase.database().ref('users/'+ user.displayName).once('value').then(function(snapshot){
      //   if(snapshot.hasChild('subCategory')){
      //     firebase.database().ref('users/'+ user.displayName + '/subCategory').on("value",(snapshot) => {
      //       $('#subCategorySort')
      //       .find('option')
      //       .remove()
      //       .end()
      //       $('#subCategorySort').append(new Option('All', 'All'));              
      //       console.log(Object.keys(snapshot.val()));
      //       Object.keys(snapshot.val()).forEach(element => {
      //         $('#subCategorySort').append(new Option(element, element));              
      //       });
      //     });
      //   }
      // });

      // $('#subCategorySort').on('change', function() {
      //   for(var e in products){
      //     if(e == this.value){
      //       $('#productpg').html('');
      //       console.log(products[e]);
      //       createDiv(products[e])
      //     }
      //   }
      //   if($('#subCategorySort').val() == 'All'){
      //     $('#productpg').html('');
      //     createDiv(product)
      //   }
      //   // alert( this.value );
      // });

        console.log('Active user ' + user.displayName);
        document.title = user.displayName;
        document.getElementById('user').innerHTML = user.displayName;
        document.getElementById('cmp_name').innerHTML = user.displayName;
        // document.getElementById('logo').src = user.photoURL;

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