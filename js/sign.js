var cname = document.getElementById('company_name').value;
data.ref('company/'+cname).on('value',function(snapshot){
  document.getElementById('name').value = snapshot.val().Company;
  document.getElementById('email').value = snapshot.val().Company;
  document.getElementById('location').value = snapshot.val().Company;
  document.getElementById('contact').value = snapshot.val().Company;
});
