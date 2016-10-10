$(document).ready(function () {
    
    $('#sl_countries').chosen();

  $('#btnValidate').click(function() {
        var sEmail = $('#email').val();
        var sPhone = $('#mobileNo').val();     
        if ($("#firstName").val().trim()=="" || $("#lastName").val().trim()=="" || $.trim(sEmail).length == 0 || $.trim(sPhone).length == 0) {
        alert('All fields are mandatory');
        return false;
        }
        if($("#password").val().trim()!=$("#confirmPassword").val().trim()){
             alert('Passwords do not match');
            return false;
        }
        if (!validateEmail(sEmail)) {
            alert('Invalid Email Address');
            return false;
        }  
        if (!validatePhone(sPhone)) {
            alert('Invalid Mobile Number');
            return false;
        }        
        
    });
});

       // Function that validates email address through a regular expression.
function validateEmail(sEmail) {
var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
if (filter.test(sEmail)) {
return true;
}
else {
return false;
}
}


function validatePhone(sPhone) {
var filter = /[0-9]/;
if (filter.test(sPhone)) {
return true;
}
else {
return false;
}
}