var ih,ihLogo;
let count_notification_pending = 0,count_notification_accept=0;
if(window.location.href.includes('#orders')){
  // window.location.reload()
  $('#orders').show();
  $('#pro-man').hide();
  $('#dashboardDiv').hide();
  $('#cus-man').hide();
  $('#products').hide();
  $('#side-order').removeClass('active_menu_link');
  $('#side-products').removeClass('active_menu_link');
  $('#side-pro-man').removeClass('active_menu_link');
  $('#side-dashboard').removeClass('active_menu_link');
  $('#side-cus-man').removeClass('active_menu_link');
}
if(window.location.href.includes('#pro-man')){
  // window.location.reload()
  $('#dashboardDiv').hide();
  $('#orders').hide();
  $('#cus-man').hide();
  $('#products').hide();
  $('#pro-man').show();
  $('#side-order').removeClass('active_menu_link');
  $('#side-products').removeClass('active_menu_link');
  $('#side-pro-man').addClass('active_menu_link');
  $('#side-dashboard').removeClass('active_menu_link');
  $('#side-cus-man').removeClass('active_menu_link');
}
if(window.location.href.includes('#products')){
  // window.location.reload()
  $('#pro-man').hide();
  $('#dashboardDiv').hide();
  $('#orders').hide();
  $('#cus-man').hide();
  $('#products').show();
  $('#side-order').removeClass('active_menu_link');
  $('#side-products').addClass('active_menu_link');
  $('#side-pro-man').removeClass('active_menu_link');
  $('#side-dashboard').removeClass('active_menu_link');
  $('#side-cus-man').removeClass('active_menu_link');
}
if(window.location.href.includes('#dashboardDiv')){
  // window.location.reload()
  $('#pro-man').hide();
  $('#orders').hide();
  $('#cus-man').hide();
  $('#products').hide();
  $('#dashboardDiv').show();
  $('#side-order').removeClass('active_menu_link');
  $('#side-products').removeClass('active_menu_link');
  $('#side-pro-man').removeClass('active_menu_link');
  $('#side-dashboard').addClass('active_menu_link');
  $('#side-cus-man').removeClass('active_menu_link');
}
if(window.location.href.includes('#cus-man')){
  // window.location.reload()
  $('#pro-man').hide();
  $('#orders').hide();
  $('#cus-man').show();
  $('#products').hide();
  $('#dashboardDiv').hide();
  $('#side-order').removeClass('active_menu_link');
  $('#side-products').removeClass('active_menu_link');
  $('#side-pro-man').removeClass('active_menu_link');
  $('#side-dashboard').removeClass('active_menu_link');
  $('#side-cus-man').addClass('active_menu_link');
}
var product = [];
var connections = [];
var con_pending_help = [];
var con_pending = [];
var con_approved = [];
var products = [];
function createDiv(productX){
	console.log(productX);
  $('#numOfProducts').text(productX.length);
  for(var i in productX){
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
	btnDelete.className = 'btn btn-danger deleteBtn';
  btnDelete.id = i;
    d.className = 'card my-3';
    d1.className = 'row no-gutters';
    d2.className = 'col-md-4';
    d3.className = 'col-md-8';
    d4.className = 'card-body';
    h5.className = 'text-dark card-title'
    p1.className = 'text-primary card-text'
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
    img.src = productX[i].imgUrl;
	  img.style.width= '250px';
	  img.style.height= '250px';
    h5.textContent = productX[i].productName;
    p1.textContent = 'Mrp: ' + productX[i].mrp + ' Price: ' + productX[i].price;
    small.textContent = productX[i].description;
    $(".deleteBtn").click(function() {
    //   alert(this.id); // or alert($(this).attr('id'));
    //   alert(product[this.id].productName);
      firebase.database().ref('users/'+ localStorage.getItem('user') + '/subCategory/' + productX[this.id].category + '/' + product[this.id].productName + '/').remove();
	//   window.location.reload();
      return false;
  });
  }
}

function createConnectionDiv(con,status){
    document.getElementById('cuspg').textContent = '';
    console.log(con);
    con.forEach(element => {
       console.log(element); 
    });

    for(var i in con){
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
        var btnDeleteX = document.createElement("button");
        btnDeleteX.textContent = 'Accept';
        btnDeleteX.className = 'btn btn-success pending';
        // btnDeleteX.id = 'conbtn';
      	btnDeleteX.id = i;
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
        document.getElementById('cuspg').appendChild(d);
        d.appendChild(d1)
        d1.appendChild(d2)
        d2.appendChild(img)
        d1.appendChild(d3)
        d3.appendChild(d4)
        d3.appendChild(btnDeleteX)
        d4.appendChild(h5)
        d4.appendChild(p1)
        d4.appendChild(p2)
        p2.appendChild(small)
        d.style.maxWidth = '1040px';
        d.style.height = 'auto';
        img.src = con[i].profileUrl;
          img.style.width= '250px';
          img.style.height= '250px';
        h5.textContent = con[i].name;
        p1.innerHTML = '<b class="text-dark">Category</b>: ' + con[i].category + ' <b class="text-dark">Email</b> ' + con[i].email;
        small.innerHTML = '<b class="text-dark">Address: </b>' + con[i].address + '<b class="text-dark"> PinCode: </b>' + con[i].pinCode + '<b class="text-dark"> Contact: </b>' + con[i].mobileNumber;
		$(".pending").click(function() {
			alert(con[this.id].name);
			firebase.database().ref('connection_users/' + localStorage.getItem('user') + '/' + con[this.id].name + '/').update({
				status: 'Accepted' 
			})
			firebase.database().ref('connections_wholesalers/' + con[this.id].name + '/' +localStorage.getItem('user') + '/').update({
				status: 'Accepted' 
			})
			window.location.reload();
		})
      }
}

function createOrderDiv(order){
    document.getElementById('orderpg').textContent = '';
    console.log(order);
    order.forEach(element => {
       console.log(element); 
    });

    for(var i in order){
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
        // btnDeleteX.id = 'conbtn';
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
        document.getElementById('orderpg').appendChild(d);
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
        img.src = order[i].imgUrl;
          img.style.width= '250px';
          img.style.height= '250px';
        h5.innerHTML = '<b> Order by: ' + order[i].name + '</b> </br> <code>' + order[i].productName + '</code>';
        p1.innerHTML = '<b class="text-dark">Category</b>: ' + order[i].subCategory + ' <b class="text-dark">Date Of Order: </b> ' + order[i].date;
        small.innerHTML = '<b class="text-dark">Qty: </b>' + order[i].totalItems + '<b class="text-dark"> Total Amount of Order: </b>' + order[i].totalPrice + '<b class="text-dark">';
		
      }
}

$('#side-dashboard').click(() => {
  $('#side-dashboard').addClass('active_menu_link');
  $('#side-pro-man').removeClass('active_menu_link');
  $('#side-cus-man').removeClass('active_menu_link');
  $('#side-order').removeClass('active_menu_link');
  $('#products').hide();
  $('#side-products').removeClass('active_menu_link');
  $('#dashboardDiv').show();
  $('#orders').hide();
  $('#pro-man').hide();
  $('#cus-man').hide();
});

$('#side-order').click(() => {
  $('#side-order').addClass('active_menu_link');
  $('#side-dashboard').removeClass('active_menu_link');
  $('#side-pro-man').removeClass('active_menu_link');
  $('#side-cus-man').removeClass('active_menu_link');
  $('#products').hide();
  $('#orders').show();
  $('#side-products').removeClass('active_menu_link');
  $('#dashboardDiv').hide();
  $('#pro-man').hide();
  $('#cus-man').hide();
});

$('#side-pro-man').click(() => {
  $('#pro-man').show();
  $('#dashboardDiv').hide();
  $('#cus-man').hide();
  $('#orders').hide();
  $('#products').hide();
  $('#side-products').removeClass('active_menu_link');
  $('#side-order').removeClass('active_menu_link');
  $('#side-pro-man').addClass('active_menu_link');
  $('#side-dashboard').removeClass('active_menu_link');
  $('#side-cus-man').removeClass('active_menu_link');
});

$('#side-cus-man').click(() => {
  $('#pro-man').hide();
  $('#dashboardDiv').hide();
  $('#cus-man').show();
  $('#products').hide();
  $('#orders').hide();
  $('#side-products').removeClass('active_menu_link');
  $('#side-cus-man').addClass('active_menu_link');
  $('#side-pro-man').removeClass('active_menu_link');
  $('#side-order').removeClass('active_menu_link');
  $('#side-dashboard').removeClass('active_menu_link');
});

$('#side-products').click(() => {
  $('#pro-man').hide();
  $('#dashboardDiv').hide();
  $('#cus-man').hide();
  $('#products').show();
  $('#orders').hide();
  $('#side-products').addClass('active_menu_link');
  $('#side-cus-man').removeClass('active_menu_link');
  $('#side-pro-man').removeClass('active_menu_link');
  $('#side-order').removeClass('active_menu_link');
  $('#side-dashboard').removeClass('active_menu_link');
});

$('#addCategory').click(() => {
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
          imgUrl: ih,
		  category: category
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
			if(snapshot.val() != null){
				console.log(Object.keys(snapshot.val()));
				Object.keys(snapshot.val()).forEach(element => {
				  $('#subCategory').append(new Option(element, element));              
				});
			}           
            products = snapshot.val();
            console.log(products);
            product = []
            for(var pro in products){
              var obj = products[pro];
			  console.log(obj);
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
	let op = []
    let order = []
      // connection management code
	  firebase.database().ref('connection_users/' + user.displayName).once('value').then(function(snapshot){
		  connections = snapshot.val()
		//   console.log(connections);
		  for(var i in connections){
			  var ob = connections[i];
			  ob['name'] = i;
			  con_pending_help.push(ob);
			//   document.getElementById('conbtn').textContent = ob['status'];
		  }
		  console.log(con_pending_help);
		  for(var j in con_pending_help){
			if(con_pending_help[j]['status'] == 'Pending'){
				firebase.database().ref('category_wholesalers/' + con_pending_help[j]['category'] + '/' + con_pending_help[j]['name'] + '/').once('value').then(function(snapshot) {
					op.push(snapshot.val());
					console.log(op);
					createConnectionDiv(op,0);
				});
			}
		}
	  });

	  firebase.database().ref('connection_users/' + user.displayName).once('value').then(function(snapshot) {
		var con = snapshot.val();
		for(var i in con){
			if(con[i]['orders'] != undefined){
				console.log(con[i]['orders']);
				for(var x in con[i]['orders']){
					con[i]['orders'][x]['name'] = i;
					order.push(con[i]['orders'][x])
				}
			}
		}
		console.log(order);
		createOrderDiv(order);
	  })
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
        count_notification_pending = 0
        snapshot.forEach(element => {
          // console.log(element.val()['status']);  
          if(element.val()['status'] === 'Pending'){
            count_notification_pending++;
          }          
        });
        $('#notification').text(count_notification_pending);
        $('#notification_connection').text(count_notification_pending);
      })
      firebase.database().ref('connection_users/'+user.displayName).on("value",(snapshot) => {
        count_notification_accept = 0
        snapshot.forEach(element => {
          // console.log(element.val()['status']);  
          if(element.val()['status'] === 'Accepted'){
            count_notification_accept++;
          }          
        });
        $('#notification_connection').text(count_notification_accept);
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