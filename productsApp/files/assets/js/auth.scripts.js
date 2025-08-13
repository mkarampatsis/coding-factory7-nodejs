$(document).ready(function(){

   $('.row').off('click', '.btnSubmit').on('click', '.btnSubmit', function () {

    let username = $("#username").val();
    let password = $("#password").val();
    
    const item = {
      'username': username,
      'password': password,
    }

    console.log($('.btnSubmit').val(), item);
    $.ajax({
      url: "http://localhost:3000/api/auth/login",
      type: "post",
      data: item,
      dataType: "JSON",
      // encode: true,
    })
    .done( function(response) {
      // console.log(">>", response);
      
      let data = response.data;
      let status = response.status
  
      if (status) { 
          console.log(true,'Επιτυχής σύνδεση του χρήστη');
          alert(true,'Επιτυχής σύνδεση του χρήστη');
          $('#frmLogin')[0].reset();
          // Save the token to localStorage
          localStorage.setItem('jwt_token', data);
          window.location.replace("http://localhost:3000/user/find.html")
      } else {
          console.log(false,'Πρόβλημα στην συνδεση του χρήστη ('+ data + ')');
          alert(false,'Πρόβλημα στην σύνδεση του χρήστη ('+ data + ')');
          $('#frmLogin')[0].reset();
          // console.log(data.message);
      }
    })
    .fail(function(err){
      console.log("Error>>", err.responseJSON.data);
      alert(false,err.responseJSON.data);
    });;

    return false
  });

});

function alert(status, message){
  if (status){
      $('.alert').addClass('alert-success');
      $('.alert').removeClass('alert-danger');
  } else {
      $('.alert').addClass('alert-danger');
      $('.alert').removeClass('alert-success');
  }
  $('.alert').html(message);
}